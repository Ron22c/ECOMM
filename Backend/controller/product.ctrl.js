const productModel = require('../model/product.model');
const errors = require('../utils/ErrorHandler');
const catchAsyncError = require('../middlewires/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');

exports.createProduct = catchAsyncError(async (req, res, next) => {

    let product = req.body;
    
    product = await productModel.create(product);
    
    res.status(201).json({
        success: true,
        product: product
    });
})

exports.getProducts = async (req, res, next) => {
    let itemsPerPage = 4;

    let totalItems = await productModel.countDocuments();
    let search = new ApiFeatures(productModel.find(), req.query)
                    .search()
                    .filter()
                    .pagination(itemsPerPage);

    let products = await search.query;
    
    res.status(200).json({
        success: true,
        count: products.length,
        totalItems,
        products: products
    })
}

exports.getProductById = async (req, res, next) => {

    try {
        let product = await productModel.findById(req.params.id);
        
        if(!product) {
            next(new errors('product not found', 404));
            return;
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: err
        })
    }
}

exports.updateProductById = async (req, res, next) => {
    try {
        let product = await productModel.findById(req.params.id);

        if(!product) {
            res.status(404).json({success: false, message: 'product not found'});
        }

        product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(201).json({success: true, product});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: err
        })
    }
}

exports.deleteProductById = async(req, res, next) => {
    try {
        let product = await productModel.findById(req.params.id);

        if(!product) {
            res.status(404).json({success: false, message: 'product not found'});
        }

        product = await productModel.findByIdAndRemove(req.params.id);

        res.status(200).json({success: false, message: `product ${req.params.id} is deleted`, product});

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            err: err
        })
    }
}