const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {getAllProducts, getProductById, getProductByName, addProduct, updateProductById} = require('../Controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
//router.get('/:id', getProductByCategory);
router.get('/search:name', getProductByName);
router.put('/:id', updateProductById);
//router.delete('/:id', deleteProductsById);
router.post('/', addProduct);
module.exports = router;
