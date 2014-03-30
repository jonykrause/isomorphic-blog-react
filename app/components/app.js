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
  }
}


module.exports = App;
