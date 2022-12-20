const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
  const id = req.params.spotId
  // const spot = await Spot.findByPk(id);
  const spot = await Spot.findOne({
    where: {
      id,
    },
    include:
      [
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
        }
      ]
  })
  if (!spot) {
    res.status(404);
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  return res.json(spot);
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
