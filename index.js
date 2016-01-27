var express         = require('express');
var mongoose        = require('mongoose');
var request         = require('request');
var _               = require('lodash');
var path 			      = require('path');

var app = express();

var uri = "mongodb://reedk:gahackathon@ds051665.mongolab.com:51665/heroku_0n6bwt98";

mongoose.connect(uri);
mongoose.connection.once('open', function(){

  //Load DB models
  app.models = require('./server/models/index');

  app.use(express.static(path.join(__dirname, 'client')));

  // Load the routes.
  var routes = require('./server/routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller);
  });

  console.log("RUNNING");
  app.listen(process.env.PORT || 3000);
});