// models/product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);
