const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.listProducts = async (req, res) => {
    const products = await Product.find();
    res.render('list', { products, isAdmin: req.session.isAdmin }); // Pass isAdmin from session
};


exports.showAddProductForm = (req, res) => {
    res.render('add-edit', { product: {}, errors: [] });
};

exports.addProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Render the form again with error messages and previously entered values
        return res.status(400).render('add-edit', {
            errors: errors.array(),
            product: req.body
        });
    }

    // If validation passes, proceed to save the product
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newProduct.save()
        .then(() => res.redirect('/products'))
        .catch(err => res.status(500).send(err.message));
};
exports.showProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('details', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

exports.showEditProductForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('add-edit', { product, errors: [] });
    } catch (error) {
        res.status(404).send('Product not found.');
    }
};

exports.editProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If validation fails, render the form again with error messages and existing values
        return res.status(400).render('add-edit', {
            product: { ...req.body, _id: req.params.id }, // Include the ID for the edit form
            errors: errors.array()
        });
    }

    try {
        // Validation passed, proceed to update the product
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update the product.");
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete product.');
    }
};
