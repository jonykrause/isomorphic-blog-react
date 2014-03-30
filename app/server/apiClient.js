/**
 * Small wrapper around `superagent` module to make it easier to consume
 * the API the same way on client & server.
 */
var superagent = require('superagent');
var isServer = require('../../lib/isServer');

/**
 * Proxy each method to `superagent`, formatting the URL.
 */
['get', 'post', 'put', 'path', 'del'].forEach(function(method) {
  exports[method] = function(path) {
    var args = Array.prototype.slice.call(arguments, 1);
    return superagent[method].apply(null, [formatUrl(path)].concat(args));
  };
});

function formatUrl(path) {
  var url;
  if (isServer()) {
    // Prepend host and port of the API server to the path.
    url = 'http://localhost:8888' + path;
  } else {
    // Prepend `/api` to relative URL, to proxy to API server.
    url = path;
  }
  return url;
}
