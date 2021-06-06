const express = require('express');
let app = express();

app.use(express.json());

const productRouter = require('./router/product.router');
const errors = require('./middlewires/errorsMiddlewire');


app.use('/api/v1', productRouter);

app.get('/',(req, res) => {
    res.send("WELCOME TO THE APP")
});

app.use(errors);

module.exports = app;