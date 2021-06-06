const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'PLEASE PROVIDE A PRODUCT NAME'],
        trim: true,
        maxLength: [100, 'Please provide a name lesser then 100 char'] 
    },
    price: {
        type: Number,
        required: [true, 'PLEASE PROVIDE A PRODUCT PRICE'],
        maxLength: [5, 'Please provide a price lesser then 5 char'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'PLEASE PROVIDE A PRODUCT description'],
        trim: true,
        maxLength: [2000, 'Please provide a description lesser then 2000 char'] 
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'PLEASE PROVIDE A CATEGORY'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'        
            ],
            message: 'please select a valid category'
        }
    },
    seller: {
        type: String, 
        required: [true, 'please provide product seller']
    },
    stock: {
        type: Number,
        required: [true, 'please provide stock'],
        maxLength:[5, 'cannot be greater then 5'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type:String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('product', productSchema)