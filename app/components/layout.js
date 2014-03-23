/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var ReactMount  = require('react/lib/ReactMount');
var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var Home = require('./home');

ReactMount.allowFullPageRender = true;

var Layout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/style.css" />
          <script src="/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={Home} />
        </Pages>
      </html>
    );
  }
});


if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(Layout(), document);
  }
}


module.exports = Layout;
