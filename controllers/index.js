const { request } = require('express');
const usersController = require('./usersController');

module.exports = {
    users: usersController,
};