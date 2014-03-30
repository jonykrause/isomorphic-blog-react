/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync  = require('react-async');
var ReactRouter = require('react-router-component');
var apiClient = require('../../../server/apiClient');
var Post = require('./postItem');

var Posts = React.createClass({
  mixins: [ReactAsync.Mixin],

  propTypes: {itemCount: React.PropTypes.number},

  getInitialStateAsync: function(callback) {
    apiClient.get('/api/posts', function(err, res) {
      if (err) return callback(err);
      var initialState = {posts: res.body.map(function(post) {
        return {linkpost: post.meta.linkpost, slug: post.slug, title: post.meta.title, date: post.meta.date};
      })};
      return callback(null, initialState);
    });
  },

 sortByDate: function(arr) {
  return arr.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
 },

  render: function() {
    var posts = this.state.posts ? this.sortByDate(this.state.posts).map(function(post, i) {
      if (!this.props.itemCount || i < this.props.itemCount) {
        return <Post key={i} linkpost={post.linkpost} title={post.title} date={post.date} slug={post.slug} />;
      }
    }.bind(this)) : [];
    return (
      <div itemscope="" itemType="http://schema.org/Blog">
        <ul itemscope="" itemType="http://schema.org/BlogPosts" className="post-list">
          {posts}
        </ul>
      </div>
    );
  }
});

module.exports = Posts;
