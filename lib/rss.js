var fs = require('fs');
var RSS = require('rss');


exports.feed = new RSS({
  title: 'Jonathan Krause @jonykrause, Front–end developer',
  description: 'Personal Website and Blog of Jonathan Krause',
  feed_url: 'http://jonykrau.se/rss.xml',
  site_url: 'http://jonykrau.se',
  image_url: 'http://jonykrau.se/jony.jpg'
});

exports.rssify = function(post) {
  return exports.feed.item({
    title: post.meta.title,
    date: post.meta.date,
    url: 'http://jonykra.se/posts/' + post.slug
  });
};


exports.createXML = function(path) {
  var rssstream = fs.createWriteStream(path);
  rssstream.write(exports.feed.xml());
  rssstream.end();
};
