const { request } = require('express');
const usersController = require('./usersController');
const writersController = require('./writersController');
const booksController = require('./booksController')
const reviewsController = require('./reviewsController')

module.exports = {
    users: usersController,
    writers: writersController,
    books: booksController,
    reviews: reviewsController,
};