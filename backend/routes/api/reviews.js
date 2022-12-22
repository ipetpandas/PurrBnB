const express = require('express');
const sequelize = require('sequelize');

const { Op } = require('sequelize')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateReviews, validateReview } = require('../../utils/validators');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req, res, next) => {
  const userId = req.user.id;

  const usersReviews = await Review.findAll({
    where: {
      userId: userId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
        include: [{
          model: SpotImage,
          where: {
            preview: true
          },
          attributes: ['url']
        }]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  // convert each review into json and push into new array
  let reviews = [];
  usersReviews.forEach(review => {
    reviews.push(review.toJSON())
  });

  // iterate through reviews
  for (let review of reviews) {
    // console.log("REVIEW: ", review)
    const image = review.Spot.SpotImages[0];
    // if we find a SpotImage with 'preview: true' specified in query, then set it to it's url
    if (image) {
      review.Spot.previewImage = image.url;
      // otherwise, if no SpotImage is found where 'preview: true', then specify
    } else {
      review.Spot.previewImage = "No preview image found."
    }
    // delete SpotImages since we're already getting what we want from it in previewImage
    delete review.Spot.SpotImages;
  }

  // reviews.forEach(review => {

  //   review.Spot.SpotImages.forEach(image => {
  //     // console.log(image)
  //     if (image.preview === true) {
  //       review.Spot.previewImage = image.url
  //     } else {
  //       review.Spot.previewImage = 'No previewImage'
  //     }
  //   })
  //   delete review.Spot.SpotImages;
  // })

  return res.json({
    Reviews: reviews
  })
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  const { url } = req.body;

  const review = await Review.findByPk(reviewId);

  // Couldn't find a Review with the specified id
  if (!review) {
    res.status(404);
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  // Review must belong to the current user
  if (userId !== review.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // query for review images
  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId
    },
  })

  // Cannot add any more images because there is a maximum of 10 images per resource
  if (reviewImages.length > 10) {
    res.status(404);
    return res.json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  }

  // add image
  let newImage = await ReviewImage.create({
    reviewId,
    url
  });

  const reviewImageObj = {};
  reviewImageObj.id = newImage.id;
  reviewImageObj.url = newImage.url;

  return res.json(reviewImageObj);
})

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async(req, res, next) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  const { review, stars } = req.body;

  const reviewed = await Review.findByPk(reviewId);

  // Couldn't find a Review with the specified id
  if (!reviewed) {
    res.status(404);
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  // Review must belong to the current user
  if (userId !== reviewed.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // make edit
  reviewed.set({
    review,
    stars
  })

  await reviewed.save()

  // return
  return res.json(reviewed)
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;

  const destroyReview = await Review.findByPk(reviewId);

  if (!destroyReview) {
    res.status(404);
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  // Review must belong to the current user
  if (userId !== destroyReview.userId) {
    res.status(403)
    return res.json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }

  // delete review
  await destroyReview.destroy();
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;
