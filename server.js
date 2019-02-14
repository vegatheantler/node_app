var express 	= require('express'),
  	app 		= express(),
  	port 		= process.env.PORT || 3000,
  	Employee 	= require('./api/models/employeeModel'),
  	bodyParser 	= require('body-parser');

// var jwt 	= require('jsonwebtoken'),
// 	config 	= require('./config');

// app.set('secretVar', config.secret); // secret variable

// app.use(bodyParser.urlencoded({ extended: true }));+
// app.use(express.bodyParser({uploadDir:'./uploads'}));
app.use(bodyParser.json());
app.use(express.static('storage'));

var routes = require('./api/routes/employeeRoutes');
routes(app);

app.listen(port);

console.log('d1g1fy employee API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});