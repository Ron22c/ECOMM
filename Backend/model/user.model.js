const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name of the user'],
        maxLength: [200, 'name cannot be more then 200 character']
    },
    email: {
        type: String,
        required: [true, 'please provide email of the user'],
        unique: true,
        validate: [validator.isEmail, 'Please put a valid email id']
    },
    password: {
        type: String,
        required: [true, 'please provide password of the user'],
        minlength: [6, 'user password must be with 6 char'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: ['user', 'admin'],
            message: 'please select a valid role'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }

})

User.pre('save', async function(req, res, next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
})

User.methods.comparePassword = async function(enteredPassword) {
    return  await bcrypt.compare(enteredPassword, this.password);
    
}

User.methods.getJWT = function() {
    let token = jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
    return token;
}

module.exports = mongoose.model('user', User);