/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var ReactMount  = require('react/lib/ReactMount');
var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;

// Pages
var Home = require('./pages/home');
var About = require('./pages/about');

ReactMount.allowFullPageRender = true;

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="css/style.css" />
          <script src="js/bundle.js" />
        </head>
        <Pages className="page" path={this.props.path}>
          <Page path="/" handler={Home} />
          <Page path="/about" handler={About} />
        </Pages>
      </html>
    );
  }
});




if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}


module.exports = App;
