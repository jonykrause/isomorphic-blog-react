/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var Post = React.createClass({
  mixins: [ReactAsync.Mixin],

  getInitialStateAsync: function(cb) {
    superagent.get(
      'http://localhost:3000/api/users/' + this.props.username,
      function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  render: function() {
    return (
      <div className="UserPage">
        <h1>Hello, {this.state.name}!</h1>
        <p><Link href="/">Logout</Link></p>
      </div>
    );
  }
});

module.exports = Post;
