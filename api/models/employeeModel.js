'use strict'
var Bookshelf = require('./database');

var Employee = Bookshelf.Model.extend({
  tableName: 'employees',
  hasTimestamps: false,
});


module.exports = Bookshelf.model('Employee', Employee);