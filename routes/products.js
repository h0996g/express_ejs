// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);
router.get('/add', productController.showAddProductForm);
router.post('/add', productController.addProduct);
router.get('/edit/:id', productController.showEditProductForm);
router.post('/edit/:id', productController.editProduct);
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;
