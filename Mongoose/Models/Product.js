// import mongoose
const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    image: String   // store image path
});

module.exports = mongoose.model("Product", productSchema);