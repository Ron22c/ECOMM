const express = require('express');
const Router = express.Router();

const { registerUser, loginUser } = require('../controller/auth.ctrl');

Router.route('/user').post(registerUser);

Router.route('/login').post(loginUser);


module.exports = Router;