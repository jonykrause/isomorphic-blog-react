var posts;
var fs = require('fs');
var rss = require('./rss');
var slug = require('slug');
var Promise = require('bluebird');
var yamlhead = require('yamlhead');
var marked = require('marked').setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});


function getPosts(dir) {
  return new Promise(function(resolve, reject) {
    if (Array.isArray(posts)) return resolve(posts);
    fs.readdir(dir, function(err, files) {
      if (err) reject(err);
      Promise.all(
        files.map(function(file) {
          return buildPost(dir+'/'+file);
        })
      ).then(function(results) {
        rss.createXML('public/rss.xml');
        return resolve(posts = results);
      }).catch(function(error) {
        console.log(error);
      });
    });
  });
};

function buildPost(path) {
  return new Promise(function(resolve, reject) {
    yamlhead(path, function(err, yaml, data) {
      if (err) return reject(err);
      var post = {};
      post.meta = yaml;
      post.markup = JSON.stringify(marked(data));
      post.slug = slug(yaml.title).toLowerCase();
      rss.rssify(post);
      return resolve(post);
    });
  });
};


module.exports = getPosts;





