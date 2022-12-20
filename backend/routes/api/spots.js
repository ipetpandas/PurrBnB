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

  const average = rating[0].toJSON().avgRating
  spotObject.avgRating = Number(average.toFixed(1));
}

module.exports = router;
