const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
  const userId = req.user.id;

  // find all user's bookings
  const usersBookings = await Booking.findAll({
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: SpotImage,
            where: {
              preview: true
            }
          }
        ]
      }
    ],
    where: {
      userId: userId
    }
  });

  // convert each user's booking into json
  let bookings = [];
  usersBookings.forEach(booking => {
    bookings.push(booking.toJSON());
  });

  for (let booking of bookings) {
    // in the case where a Spot contains no spot images
    let image;
    if (booking.Spot) {
      image = booking.Spot.SpotImages[0];
    }
    if (image) {
      booking.Spot.previewImage = image.url;
    } else {
      // if the associated booking can't get Spot info
      booking.Spot = {};
      booking.Spot.previewImage = "No preview image found."
    }
    delete booking.Spot.SpotImages;
  }

  // bookings.forEach(booking => {
  //   booking.Spot.SpotImages.forEach(image => {
  //     if(image.preview === true) {
  //       booking.Spot.previewImage = image.url
  //     } else {
  //       booking.Spot.previewImage = 'No previewImage'
  //     }
  //   })
  //   // don't need spotImages
  //   delete booking.Spot.SpotImages;
  // })

  // return
  return res.json({
    Bookings: bookings
  })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;

  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);
  // { userId, startDate, endDate, spotId }


  // Couldn't find a Booking with the specified id
  if (!booking) {
    res.status(404);
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  // endDate cannot come before startDate
  if (Date.parse(startDate) >= Date.parse(endDate)) {
    res.status(400);
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot come before startDate"
      }
    })
  }

  // can't edit a booking that's past the end date
  if (Date.parse(startDate) <= Date.now()) {
    res.status(403);
    return res.json({
      "message": "Past bookings can't be modified",
      "statusCode": 403
    })
  }

  // if unauthorized
  if(userId !== booking.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // booking conflict
  const spotId = booking.toJSON().spotId;
  const booked = await Booking.findOne({
    where: {
      spotId,
      // exclude the booking that we are editing
      [Op.not]: { id: bookingId },
      [Op.or]: [
        // 1st scenario -- is there an existing booking that overlaps with requested startDate?
        {startDate: {[Op.between]: [startDate, endDate]}},
        // 2nd scenario -- is there an existing booking that overlaps with requested endDate?
        {endDate: {[Op.between]: [startDate, endDate]}},

        //                    18th     to         23rd
        // Existing -----[ startDate]-----------[endDate]------------
        //                 16th             to              24th
        // Requested  [startDate] ----------------------- [endDate]

        // 3rd scenario -- is there an existing booking that falls completely between the requested booking?
        {[Op.and]: [
          {startDate: {[Op.gte]: startDate}},
          {endDate: {[Op.lte]: endDate}}
        ]}
      ]
    }
  })



  if (booked) {
    res.status(403);
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  // booking belongs to user may edit
  if (booking.userId === userId) {
    booking.set({
      startDate,
      endDate
    })
  }
  await booking.save();

  // return
  return res.json(booking);
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const bookingId = req.params.bookingId;

  const destroyBooking = await Booking.findByPk(bookingId);

  // if booking does not exist
  if(!destroyBooking) {
    res.status(404);
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  // if unauthorized
  if(userId !== destroyBooking.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // Bookings that have been started can't be deleted
  const today = new Date(new Date().toDateString()).getTime();
  const bookDate = new Date(destroyBooking.startDate.toDateString()).getTime();

  if(today >= bookDate) {
    res.status(403);
    return res.json({
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
  }


  if (userId === destroyBooking.userId) {
    await destroyBooking.destroy();
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

module.exports = router;
