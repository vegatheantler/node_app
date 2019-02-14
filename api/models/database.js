'use strict';
var knex      = require('knex')(require(__dirname + '/../../knexfile')),
    Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;