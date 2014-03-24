/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./partials/header.js');
var Footer = require('./partials/footer.js');

var Layout = React.createClass({
  render: function() {
    return (
      <div className="page-container">
        <Header />
        <div className="page-content l-module">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
});


module.exports = Layout;
