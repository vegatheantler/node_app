'use strict';
var Bookshelf = require('../models/database'),
    Employee  = Bookshelf.model('Employee');

var fs = require('fs');

exports.show_all_employees = function(req, res) {
  Employee
    .fetchAll()
    .then(function(employees) {
      res.json(employees);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

exports.create_an_employee = function(req, res) {
  Employee.forge({
    first_name: req.body.first_name,
    age: req.body.age,
    contact: req.body.contact,
  })
  .save()
  .then(function (employee) {

    var tmp_path = req.file.path;
    var target_path = 'storage/employee_photos/' + employee.id + "." + req.file.originalname.split(".")[1];
    
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
        fs.unlink(tmp_path, function() {
          if (err) throw err;
        });
    });
    employee.photo = req.protocol+"://"+req.headers.host + "/employee_photos/" + employee.id + ".png";
    res.json({error: false, data: employee});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

exports.view_an_employee = function(req, res) {
  Employee
    .query({where: {id: req.params.employeeId}})
    .fetch()
    .then(function(employee) {
      employee.photo = req.protocol+"://"+req.headers.host + "/employee_photos/" + employee.id + ".png";
      res.json(employee);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

exports.update_an_employee = function(req, res) {
  Employee.forge({id: req.params.employeeId})
  .fetch()
  .then(function (employee) {
    employee.save({
      first_name: req.body.first_name || employee.get('first_name'),
      age: req.body.age || employee.get('age'),
      contact: req.body.contact || employee.get('contact'),
    })
    .then(function () {
      if (req.file != null) {
        var tmp_path = req.file.path;
        var target_path = 'storage/employee_photos/' + employee.id + "." + req.file.originalname.split(".")[1];
        
        fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
            fs.unlink(tmp_path, function() {
              if (err) throw err;
            });
        });
      }
      employee.photo = req.protocol+"://"+req.headers.host + "/employee_photos/" + employee.id + ".png";
      res.json({error: false, data: {message: 'Employee details updated', employee}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

exports.delete_an_employee = function(req, res) {
  Employee
    .query({where: {id: req.params.employeeId}})
    .destroy()
    .then(function() {
      fs.unlink('storage/employee_photos/' + req.params.employeeId + ".png", function() {});
      res.json(['Employee removed sucessfully']);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};
