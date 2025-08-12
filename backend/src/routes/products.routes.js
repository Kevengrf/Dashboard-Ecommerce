const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

// Rota para criar um novo produto
router.post('/', productController.createProduct);

// Futuramente: router.get('/', productController.getAllProducts);

module.exports = router;
