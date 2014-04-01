/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync  = require('react-async');
var ReactRouter = require('react-router-component');
var PostList = require('./partials/postList');
var Layout = require('../layout');

var Posts = React.createClass({
  render: function() {
    return (
      <Layout>
        <PostList />
      </Layout>
    );
  }
});

module.exports = Posts;
