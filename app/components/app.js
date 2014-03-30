/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var ReactMount = require('react/lib/ReactMount');
var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var isServer = require('../../lib/isServer');

// Pages
var Home = require('./pages/home');
var About = require('./pages/about');
var Posts = require('./pages/posts');
var Post = require('./pages/post');

ReactMount.allowFullPageRender = true;

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Jonathan Krause @jonykrause, Front–end developer</title>
          <meta name="description" content="Jonathan Krause, Front-end Developer" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Jonathan Krause @jonykrause" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="keywords" content="༼☉ɷ⊙༽" />
          <link type="text/plain" rel="author" href="/humans.txt" />
          <link rel="icon" href="/img/favicon.ico" />
          <link href="/rss.xml" type="application/rss+xml" rel="alternate" />
          <link rel="stylesheet" href="/css/style.css" />
          <script src="/js/bundle.js" />
        </head>
        <Pages className="page" path={this.props.path}>
          <Page path="/" handler={Home} />
          <Page path="/posts" handler={Posts} />
          <Page path="/posts/:slug" handler={Post} />
          <Page path="/about" handler={About} />
        </Pages>
      </html>
    );
  }
});




if (!isServer()) {
  window.onload = function() {
    React.renderComponent(App(), document);


    (function(a,e,f,g,b,c,d){a.GoogleAnalyticsObject=b;a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};a[b].l=1*new Date;c=e.createElement(f);d=e.getElementsByTagName(f)[0];c.async=1;c.src=g;d.parentNode.insertBefore(c,d)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-37971335-1","jonykrau.se");ga("send","pageview");

  }
}


module.exports = App;
