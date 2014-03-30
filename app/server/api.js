var path = require('path');
var httpProxy = require('http-proxy');
var getPosts = require('../../lib/getPosts');
var DIR = path.resolve(__dirname, '../../posts');


function logError(error) {
  console.log('Exception ' + error);
};

module.exports = function(app) {

  app.get('/api/posts', function(req, res) {
    getPosts(DIR).then(function(posts) {
      res.send(posts);
    })
    .catch(logError)
  });

  app.get('/api/posts/:slug', function(req, res) {
    getPosts(DIR).then(function(posts) {
      var post = posts.filter(function(post) {
        return post.slug === req.params.slug;
      });
      res.send(post);
    })
    .catch(logError)
  });

  /**
   * On the client, we want to be able to just send API requests to the
   * main web server using a relative URL, so we proxy requests to the
   * API server here.
   */
  // var proxy = new httpProxy.RoutingProxy();

  // app.proxyMiddleware = function(apiPort) {
  //   return function(req, res, next) {
  //     proxy.proxyRequest(req, res, {
  //       host: 'localhost',
  //       port: apiPort
  //     });
  //   };
  // };
}
