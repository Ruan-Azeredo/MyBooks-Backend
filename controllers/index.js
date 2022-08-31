const { request } = require('express');
const userController = require('./userController');

module.exports = {
    users: userController,
};