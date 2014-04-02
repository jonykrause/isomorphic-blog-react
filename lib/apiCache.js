var apiClient = require('./apiClient');
var db = require('./db');
var isServer = require('./isServer');

// Cache api calls using localforage
exports.get = function(path, callback) {
  if (isServer()) {
    return apiClient.get(path, function(err, res) {
      if (err) return callback(err);
      return callback(null, res);
    });
  } else {
    var item = window.localForageConfig.name + path;
    return db.getItem(item, function(res) {
      if (res) return callback(null, {body: res});
      apiClient.get(path, function(err, res) {
        if (err) return callback(err);
        db.setItem(item, res.body, function() {
          return callback(null, res);
        });
      });
    });
  }
};
