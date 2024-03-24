const { body, validationResult } = require('express-validator');

const validate = (method) => {
    switch (method) {
        case 'createProduct':
        case 'updateProduct':
            return [
                body('name').trim().isLength({ min: 1 }).withMessage('Name is required.'),
                body('description').trim().isLength({ min: 1 }).withMessage('Description is required.'),
                body('price').isFloat({ min: 0.01 }).withMessage('Price must be greater than zero.')
            ];
        default:
            return [];
    }
};

// Existing controller logic here, make sure to include the validationResult check in your createProduct and updateProduct methods

const productController = {
    // List, add, update, details, delete methods here

    // Include the validate method inside your controller if you prefer, or keep it separate as a utility function
    validate
};

module.exports = productController;
