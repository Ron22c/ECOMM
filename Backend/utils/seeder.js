const productModel = require('../model/product.model');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/product.json');

dotenv.config({path: 'Backend/../.env'});

connectDatabase();

const seedProducts = async() => {
    try {
        await productModel.deleteMany();
        console.log('ALL PRODUCT DELETED');
        await productModel.insertMany(products);
        console.log('ALL PRODUCT ADDED');
        process.exit();
    } catch(err) {
        console.log(err);
        process.exit();
    }
}

seedProducts();