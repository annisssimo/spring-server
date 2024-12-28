import { body, validationResult } from 'express-validator';

export const validateSignup = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters')
    .matches(/\d/)
    .withMessage('Password must include at least 1 number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must include at least 1 letter'),
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),
  body('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters'),
  body('age')
    .isInt({ min: 1 })
    .withMessage('Age must be a valid number greater than 0'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().reduce((acc, err) => {
        acc[err.param] = err.msg;
        return acc;
      }, {}),
    });
  }
  next();
};
