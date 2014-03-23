/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var Home = React.createClass({

  render: function() {
    return (
      <div className="MainPage">
        <h1>Hello, anonymous!</h1>
        <Link href="/users/doe">Login</Link>
      </div>
    );
  }
});

module.exports = Home;
