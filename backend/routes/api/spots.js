const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateSpot } = require('../../utils/validators');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res, next) => {

  // find all spots
  const allSpots = await Spot.findAll();

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

  return res.json(spotsList)

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

    spotObject.avgStarRating = avgStarRating;
    return res.json(spotObject);
  }

})

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
  const userId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  res.status(201);
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
  } else if (!spot) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  else {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }
})

// Delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;

  const destroySpot = await Spot.findByPk(spotId);

  if (destroySpot) {
    if (userId === destroySpot.ownerId) {
      await destroySpot.destroy();
      return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      res.status(403)
      return res.json({
        "message": "Forbidden",
        "statusCode": 403
      })
    }
  } else {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
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
