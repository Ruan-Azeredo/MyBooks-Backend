const { request } = require('express');
const usersController = require('./usersController');
const writersController = require('./writersController');

module.exports = {
    users: usersController,
    writers: writersController,
};