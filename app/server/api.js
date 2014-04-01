var path = require('path');
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
}
