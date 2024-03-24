// controllers/productController.js
const { body, validationResult } = require('express-validator');
const Product = require('../models/product');

// Shared validation rules
const validateProduct = [
    body('name', 'Name is required.').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description is required.').trim().isLength({ min: 1 }).escape(),
    body('price', 'Price must be a positive number.').isFloat({ min: 0 }).escape(),
];

exports.listProducts = async (req, res) => {
    const products = await Product.find();
    res.render('list', { products });
};

exports.showAddProductForm = (req, res) => {
    res.render('add-edit', { product: {}, errors: [] });
};

// Add product with validation
exports.addProduct = [
    ...validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are validation errors
            res.render('add-edit', { product: req.body, errors: errors.array() });
            return;
        }
        // Data is valid
        const product = new Product(req.body);
        await product.save();
        res.redirect('/products');
    }
];

exports.showEditProductForm = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('add-edit', { product, errors: [] });
};

// Edit product with validation
exports.editProduct = [
    ...validateProduct,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are validation errors
            req.body._id = req.params.id; // Include id to fill hidden form field
            res.render('add-edit', { product: req.body, errors: errors.array() });
            return;
        }
        // Data is valid
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    }
];

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};
