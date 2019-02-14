'use strict';
var multer  = require('multer'),
    upload 	= multer({ dest: 'uploads' });

module.exports = function(app) {
  var employee = require('../controllers/employeeController');

  app.route('/employees')
    .get(employee.show_all_employees)
    .post(upload.single('photo'),employee.create_an_employee);

  app.route('/employees/:employeeId')
    .get(employee.view_an_employee)
    .put(upload.single('photo'),employee.update_an_employee)
    .delete(employee.delete_an_employee);
};
