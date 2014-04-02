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
        return resolve(posts = paginate(sortByDate(results)));
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

function sortByDate(posts) {
  return posts.sort(function(a, b) {
    return new Date(b.meta.date) - new Date(a.meta.date);
  });
};

function paginate(posts) {
  posts.forEach(function(post, i, arr) {
    post.nextSlug = arr[i+1] ? arr[i+1].slug : 'undefined';
    post.prevSlug = arr[i-1] ? arr[i-1].slug : 'undefined';
  });
  return posts;
};

module.exports = getPosts;





