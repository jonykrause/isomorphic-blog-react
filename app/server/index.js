'use strict';

var express = require('express');
var nodejsx = require('node-jsx').install();
var http = require('http');
var app = express();

// Global config
app.configure(function() {
  app.set('port', process.env.PORT || 8888);
  app.set('views', './views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

// Inject env config
app.configure('development', require('../config/server').development.bind(null, app, express));
app.configure('production', require('../config/server').production.bind(null, app, express));

// Inject component rendering
app.use(require('../../lib/renderRouteComponent'));


// Start server
var server = http.createServer(app);
return server.listen(app.get('port'), function() {
  return console.log('Listening on port ' + app.get('port') + ', Env: ' + app.settings.env);
});

module.exports = server;


