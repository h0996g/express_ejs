// validation/productValidation.js remains the same
const { body } = require('express-validator');

exports.productValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Product name is required.')
        .isLength({ min: 2 }).withMessage('Product name must be at least 2 characters.'),
    body('price')
        .isNumeric().withMessage('Price must be a number.')
        .isFloat({ gt: 0 }).withMessage('Price must be greater than 0.')
];
