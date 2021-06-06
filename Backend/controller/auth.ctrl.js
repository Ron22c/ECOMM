let userModel = require('../model/user.model');
let errorHandler = require('../utils/ErrorHandler');
let catchAsyncError = require('../middlewires/catchAsyncError');

exports.registerUser = catchAsyncError (async (req, res, next) => {
    let {name, email, password} = req.body;

    let user = await userModel.create({
        name,
        password,
        email,
        avatar: {
            public_id:'public.id',
            url:'www.avatar.com'
        }
    })

    res.status(201).json({
        success: true,
        user
    })
})