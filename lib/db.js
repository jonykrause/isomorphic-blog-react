var isServer = require('./isServer');
var lf;

if (!isServer()) {
  lf = require('localforage');
  window.localForageConfig = {
    name: 'jonykrau.se',
    version: 1.0
  };
}

module.exports = lf;



