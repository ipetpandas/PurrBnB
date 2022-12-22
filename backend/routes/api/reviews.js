const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateReviews } = require('../../utils/validators');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res, next) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: {
      userId: userId
    }
  })

  return res.json({
    Reviews: reviews
  })
})


module.exports = router;
