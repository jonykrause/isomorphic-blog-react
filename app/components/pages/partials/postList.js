/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync  = require('react-async');
var ReactRouter = require('react-router-component');
var PostItem = require('./postItem');
var api = require('../../../../lib/apiCache');
var isServer = require('../../../../lib/isServer');



var Posts = React.createClass({
  mixins: [ReactAsync.Mixin],

  propTypes: {itemCount: React.PropTypes.number},

  getInitialStateAsync: function(callback) {
    api.get('/api/posts', function(err, res) {
      if (err) return callback(err);
      var initialState = {posts: res.body.map(function(post) {
        return {linkpost: post.meta.linkpost, slug: post.slug, title: post.meta.title, date: post.meta.date};
      })};
      return callback(null, initialState);
    });
  },


 render: function() {
    var posts = this.state.posts ? this.state.posts.map(function(post, i, posts) {
      if (!this.props.itemCount || i < this.props.itemCount) {
        return <PostItem key={i} linkpost={post.linkpost} title={post.title} date={post.date} slug={post.slug} />;
      }
    }.bind(this)) : 'Loading...';
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
