const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation.js');

// validateSignup middleware
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required')
];

// validateSpot middleware
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required')
];

// validateReview middleware
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// validateBooking middleware
const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Start date is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('End date is required')
];

// validateQuery middleware
const validateQuery = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  check('maxLat')
    .isDecimal()
    .optional()
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .isDecimal()
    .optional()
    .withMessage('Minimum latitude is invalid'),
  check('minLng')
    .isDecimal()
    .optional()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .isDecimal()
    .optional()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .isFloat({ min: 0 })
    .optional()
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
]

module.exports = {
  validateSignup,
  validateSpot,
  validateReview,
  validateBooking,
  validateQuery,
}
