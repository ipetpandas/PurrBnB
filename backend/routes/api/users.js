// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { validateSignup } = require("../../utils/validators");

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const validationErrors = validationResult(req);

  // if body is violated
  if (!validationErrors.isEmpty()) {
    res.status(400);
    const errors = validationErrors.array();
    console.log(errors);
    const errorsObj = {};
    for (let error of errors) {
      errorsObj[error.param] = error.msg;
    }
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: errorsObj,
    });
  }

  // if email already exists in database
  const existingEmail = await User.findOne({
    where: { email },
  });

  if (existingEmail) {
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: ["User with that email already exists"],
    });
  }

  // if username already exists in database
  const existingUsername = await User.findOne({
    where: { username },
  });

  if (existingUsername) {
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: ["User with that username already exists"],
    });
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json({
    user: user,
  });
});

module.exports = router;
