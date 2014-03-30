/**
 * @jsx React.DOM
 */

var React = require('react');
var Layout = require('../layout');


var NotFound = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>dafuq, we have a 404!!</h1>
      </Layout>
    );
  }
});

module.exports = NotFound;
