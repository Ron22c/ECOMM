module.exports = (err, req, res, next) => {
    let message = err.message || 'internal server error';
    let status = err.status || 500;

    if(process.env.ENVIRONMENT === 'DEVELOPMENT') {
        let stack = err.stack;
        res.status(status).json({
            success: false,
            message,
            err,
            stack
        })
    }

    if(process.env.ENVIRONMENT === 'PRODUCTION') {

        if(err.name === 'CastError') {
            message = `Invalid value| for ${err.path}`;
        }

        if(err.name === 'ValidatorError') {
            message = Object.values(err.errors).map(value=>value.message)
        }

        res.status(status).json({
            success: false,
            message: message
        })
    }
}