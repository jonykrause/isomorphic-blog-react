var ReactAsync = require('react-async');
var ReactApp = require('../app/client');
var path = require('path');
var url = require('url');


function renderRouteComponent(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = ReactApp({path: path});
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup, data) {
    if (err) return next(err);
    res.send(ReactAsync.injectIntoMarkup(markup, data, ['/js/bundle.js']));
  });
}

module.exports = renderRouteComponent;
