/**
 * @jsx React.DOM
 */

var React = require('react');
var Layout = require('../layout');

var Home = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1 className="f-welcome">
          Hi, I’m <strong>Jonathan</strong> — <br/> Front-end Developer <br/>
          at <a href="http://www.edenspiekermann.com">Edenspiekermann</a>
        </h1>
      </Layout>
    );
  }
});

module.exports = Home;
