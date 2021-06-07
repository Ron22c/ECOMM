let userModel = require('../model/user.model');
let ErrorHandler = require('../utils/ErrorHandler');
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

exports.loginUser = catchAsyncError( async(req, res, next) => {
    let { email, password } = req.body;
    
    if (!email || !password) {
        next(new ErrorHandler('please provide email/password', 400));
        return;
    }

    let user = await userModel.findOne({email: email}).select('+password');

    if(!user) {
        next(new ErrorHandler('invalid user', 401));
        return;
    }

    let pass = await user.comparePassword(password);

    if(!pass) {
        next(new ErrorHandler('incorrect email/password', 401));
        return;
    }

    let token = await user.getJWT();

    res.status(200).json({
        success: true,
        token
    })
})