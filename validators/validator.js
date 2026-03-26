const { param,body, validationResult } = require('express-validator')
const validateCourse = [
  body("name").notEmpty().withMessage("Name is required"),
  body("term").notEmpty().withMessage("Term is required"),
  body("credits").isInt({ min: 1 }).withMessage("Credits must be a number"),
];
const validateDeleteCourse = [
  param("id")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID format"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.map({ [err.path]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  validateCourse,
  validateDeleteCourse,
  validate,
}