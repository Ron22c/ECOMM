const express = require('express');
const Router = express.Router();

const { registerUser } = require('../controller/auth.ctrl');

Router.route('/user').post(registerUser)

module.exports = Router;