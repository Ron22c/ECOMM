const express = require('express');
const Router = express.Router();

const isAuthenticated = require('../middlewires/authenticate');

const { getProducts, 
        createProduct, 
        getProductById, 
        updateProductById,
        deleteProductById } = require('../controller/product.ctrl');

Router.post('/product', createProduct);

Router.get('/product', getProducts);

Router.get('/product/:id', getProductById);

Router.route('/admin/product/:id')
        .put(isAuthenticated, updateProductById)
        .delete(isAuthenticated, deleteProductById);

module.exports = Router;