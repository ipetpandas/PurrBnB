const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateSpot, validateBooking, validateReview, validateQuery } = require('../../utils/validators');

const router = express.Router();

// Get all Spots
router.get('/', validateQuery, async (req, res, next) => {

  /* query filters/pagination start here */
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  if (!page) page = 1;
  if (!size) size = 20;

  page = parseInt(page);
  size = parseInt(size);
  maxLat = parseFloat(maxLat);
  minLat = parseFloat(minLat);
  maxLng = parseFloat(maxLng);
  minLng = parseFloat(minLng);
  maxPrice = parseFloat(maxPrice);
  minPrice = parseFloat(minPrice);

  let pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  let where = {};

  // lat
  if (minLat) where.lat = {
    [Op.gte]: minLat
  };
  if (maxLat) where.lat = {
    [Op.lte]: maxLat
  };

  // lng
  if (minLng) where.lng = {
    [Op.gte]: minLng
  };
  if (maxLng) where.lng = {
    [Op.lte]: maxLng
  };

  // price
  if (minPrice) where.price = {
    [Op.gte]: minPrice
  };
  if (maxPrice) where.price = {
    [Op.lte]: maxPrice
  };

  /* query filters/pagination ends here */

  // find all spots
  const allSpots = await Spot.findAll({
    where,
    ...pagination
  });

  // store modified spots with image url
  const spotsList = [];

  for (let spot of allSpots) {
    // convert each spot to json
    const spotObject = spot.toJSON();

    await addAvgRating(spotObject);
    await addPreviewImage(spotObject);

    // push into new array
    spotsList.push(spotObject)
  }

  return res.json({
    Spots: spotsList,
    page,
    size
  })

});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async(req, res, next) => {
  const userId = req.user.id;

  // find spots owned by user
  const spots = await Spot.findAll({
    where: {
      ownerId: userId
    }
  })

  const spotsList = [];

  for (let spot of spots) {
    // convert each spot to json
    const spotObject = spot.toJSON();

    await addAvgRating(spotObject);
    await addPreviewImage(spotObject);

    // push into new array
    spotsList.push(spotObject)
  }

  return res.json({
    Spots: spotsList
  })
});

// Get details of a Spot from an id (eagerly loading)
router.get('/:spotId', async (req, res, next) => {
  const id = req.params.spotId;

  const spots = await Spot.findAll({
    where: {
      id
    },
    include: [
      {
        model: SpotImage,
        attributes: {
          exclude: ["createdAt", "updatedAt", "spotId"]
        }
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        as: "Owner"
      },
      {
        model: Review, attributes: []
      }
    ],
    attributes: [
      "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "createdAt", "updatedAt"
    ],
  })

  // console.log(spotObject)

  if (!spots[0]) {
    res.status(404);
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    const spotObject = spots[0].toJSON();
    const reviews = await Review.findAll({where: {spotId: spotObject.id}})
    const reviewsList = [];
    let avgStarRating = 0;
    for (let review of reviews) {
      reviewObject = review.toJSON();
      avgStarRating += reviewObject.stars;
      reviewsList.push(reviewObject)
    }
    spotObject.numReviews = reviewsList.length;

    spotObject.avgStarRating = avgStarRating / reviewsList.length;
    return res.json(spotObject);
  }

})

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.build({
    ownerId: userId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })


  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await newSpot.save();
    res.status(201);
    return res.json(newSpot);
  } else {
    res.status(400);
    const errors = validatorErrors.array();
    // console.log('ERRORS: ', errors);
    const errorsObj = {};
    for (let error of errors) {
      errorsObj[error.param] = error.msg;
    }
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": errorsObj
    })
  }
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  // if spot doesn't exist
  if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // if unauthorized
  if(userId !== spot.ownerId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  const spotImg = await SpotImage.build({
    spotId,
    url,
    preview
  })

  if (spot && spot.ownerId === userId) {
    await spotImg.save();
    return res.json({
      "id": spotImg.id,
      "url": spotImg.url,
      "preview": spotImg.preview
    });
  }
})

// Delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const destroySpot = await Spot.findByPk(spotId);

  // if there is no spot
  if(!destroySpot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // if unauthorized
  if(userId !== destroySpot.ownerId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  if (userId === destroySpot.ownerId) {
    await destroySpot.destroy();
    return res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.findByPk(spotId);

  // if spot does not exist
  if(!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // if unauthorized
  if(userId !== spot.ownerId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // spot exists and belongs to current user
  if (spot && spot.ownerId === userId) {
    spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    // save those values and make sure body is not violated
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await spot.save();
      return res.json(spot);
    } else {
      res.status(400);
      const errors = validatorErrors.array();
      // console.log('ERRORS: ', errors);
      const errorsObj = {};
      for (let error of errors) {
        errorsObj[error.param] = error.msg;
      }
      return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": errorsObj
      })
    }
  }
})

/* REVIEWS START HERE */

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  // Couldn't find a Spot with the specified id
  if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // query for reviews
  const reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  res.json({
    Reviews: reviews
  })
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const { review, stars } = req.body;

  const spot = await Spot.findByPk(spotId);

  // Couldn't find a Spot with the specified id
  if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // Review from the current user already exists for the Spot
  const reviewed = await Review.findOne({
    where: {
      userId,
      spotId
    }
  });

  if (reviewed) {
    res.status(403);
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }

  // Create new review
  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  });

  // return
  res.status(201);
  return res.json(newReview);

})


/* BOOKINGS START HERE */

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  // Couldn't find a Spot with the specified id
  if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // if you are NOT the owner of the spot but want to see bookings
  if (userId !== spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })

    // return
    return res.json({
      Booking: bookings
    })
  }

  // if you ARE the owner of the spot
  if (userId === spot.ownerId) {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      where: {
        spotId: spotId
      }
    })

    // return
    return res.json({
      Bookings: bookings
    })
  }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(spotId);

  // Couldn't find a Spot with the specified id
  if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // spot cannot belong to the current user
  if (spot.ownerId === userId) {
    res.status(403);
    return res.json({
      "message": "You may not book your own spot",
      "statusCode": 403
    })
  }

  // endDate cannot come before startDate
  if (Date.parse(startDate) >= Date.parse(endDate)) {
    res.status(400);
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  // spot cannot be booked in the past
  if(Date.parse(startDate) <= Date.now()) {
    res.status(403);
    return res.json({
      "message": "Cannot create a booking in the past",
      "statusCode": 403
    })
  }

  // spot already booked
  const booked = await Booking.findOne({
    where: {
      spotId,
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
        ]},
        //                 16th             to              24th
        // Existing  [startDate] ----------------------- [endDate]
        //                    18th     to         23rd
        // Requested -----[ startDate]-----------[endDate]------------

        // 4th scenario -- is there an existing booking that falls completely outside the requested booking?
        {[Op.and]: [
          {startDate: {[Op.lte]: startDate}},
          {endDate: {[Op.gte]: endDate}}
        ]},
      ]
    }
  })

  // console.log("FOUND BOOKING: ", booked);
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


  // create new booking
  const newBooking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate,
  })

  // return
  return res.json(newBooking);

})

// helper functions start here
const addPreviewImage = async(spotObject) => {
  // find image associated to spotID
    const image = await SpotImage.findOne({
      where: {
        spotId: spotObject.id,
        preview: true
      }
    });


    // add previewImage
    if (!image) {
      spotObject.previewImage = "No preview image found"
    } else {
      const previewImage = image.url;
      spotObject.previewImage = previewImage;
    }
}

const addAvgRating = async(spotObject) => {
  const rating = await Review.findAll({
    where: {
      spotId: spotObject.id
    },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
    ]
  })

  const average = Number(rating[0].toJSON().avgRating);
  spotObject.avgRating = Number(average.toFixed(1));
}

module.exports = router;
