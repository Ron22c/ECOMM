const express = require('express');
const Router = express.Router();

const { getProducts, 
        createProduct, 
        getProductById, 
        updateProductById,
        deleteProductById } = require('../controller/product.ctrl');

Router.post('/product', createProduct);

Router.get('/product', getProducts);

Router.get('/product/:id', getProductById);

Router.route('/admin/product/:id')
        .put(updateProductById)
        .delete(deleteProductById);

module.exports = Router;