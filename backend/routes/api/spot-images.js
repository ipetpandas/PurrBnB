const express = require('express');
const sequelize = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

// Delete a Spot Image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const imageId = req.params.imageId;

  // find image
  const image = await SpotImage.findByPk(imageId);

  // Couldn't find a Spot Image with the specified id
  if (!image) {
    res.status(404);
    return res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    })
  }

  // Spot must belong to the current user
  const spot = await Spot.findByPk(image.spotId);

  if (userId !== spot.ownerId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // delete spot image
  await image.destroy();
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })


})

module.exports = router;
