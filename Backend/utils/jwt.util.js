let sendToken = (user, status, res) => {
    let token = user.getJWT();

    let options = {
        expiresAt: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(status).cookie('token', token, options).json({
        success: true,
        user: {
            name: user.name,
            email:user.email
        },
        token
    })
}

module.exports = sendToken;