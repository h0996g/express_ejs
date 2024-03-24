const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidationRules } = require('../validations/productValidations');

const { authenticate, isAdmin, isLoggedIn } = require('../Middleware/authMiddleware'); // Ensure you have these middlewares defined.

// Display all products
router.get('/', isLoggedIn, productController.listProducts);

// Display form for adding a new product (Admins only)
router.get('/add', authenticate, isAdmin, productController.showAddProductForm);

// Process adding a new product (Admins only)
router.post('/add', authenticate, isAdmin, productValidationRules, productController.addProduct);

// Display form for editing a product (Admins only)
router.get('/edit/:id', authenticate, isAdmin, productController.showEditProductForm);

// Process editing a product (Admins only)
router.post('/edit/:id', authenticate, isAdmin, productValidationRules, productController.editProduct);

// Process deleting a product (Admins only)
router.get('/delete/:id', authenticate, isAdmin, productController.deleteProduct);

module.exports = router;
