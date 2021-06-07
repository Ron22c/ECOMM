const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middlewires/catchAsyncError');

let isAuthenticated = catchAsyncError( async (req, res, next) => {
    let { token } = req.cookies;
    console.log(token)

    if(!token) {
        next(new ErrorHandler('provide token to access this route', 401));
        return;
    }

    let user = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!user) {
        next(new ErrorHandler('invalid token', 401));
        return;
    }

    req.user = await userModel.findById(user.id);

    next();
})

module.exports = isAuthenticated;