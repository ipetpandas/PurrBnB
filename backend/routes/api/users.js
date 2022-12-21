// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateSignup } = require('../../utils/validators')

const router = express.Router();

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    // if email already exists in database
    const existingEmail = await User.findOne({
      where: { email }
    });

    if (existingEmail) {
      res.status(403);
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }

    // if username already exists in database
    const existingUsername = await User.findOne({
      where: { username }
    });

    if (existingUsername) {
      res.status(403);
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }

    // // if email, firstName, or lastName are violated
    // if (email === '' || firstName === '' || lastName === '') {
    //   res.status(400);
    //   return res.json({
    //     "message": "Validation error",
    //     "statusCode": 400,
    //     "errors": {
    //       "email": "Invalid email",
    //       "username": "Username is required",
    //       "firstName": "First Name is required",
    //       "lastName": "Last Name is required"
    //     }
    //   })
    // }

    const user = await User.signup({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

module.exports = router;
