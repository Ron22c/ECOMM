const express = require('express');
let app = express();

app.use(express.json());

const productRouter = require('./router/product.router');
const authRouter = require('./router/auth.router');
const errors = require('./middlewires/errorsMiddlewire');


app.use('/api/v1', productRouter);
app.use('/api/v1', authRouter);

app.get('/',(req, res) => {
    res.send("WELCOME TO THE APP")
});

app.use(errors);

module.exports = app;