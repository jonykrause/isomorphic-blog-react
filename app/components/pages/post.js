/**
 * @jsx React.DOM
 */

var Layout = require('../layout');
var React = require('react');
var ReactAsync  = require('react-async');
var FormattedDate = require('./partials/formattedDate');
var ReactRouter = require('react-router-component');
var api = require('../../../lib/cache');
var Layout = require('../layout');

var Post = React.createClass({
  mixins: [ReactAsync.Mixin],

  getInitialStateAsync: function (callback) {
    api.get('/api/posts/' + this.props.slug, function(err, res){
      if (err) return callback(err);
      return callback(null, res.body[0]);
    });
  },

  render: function() {
    return (
      <Layout>
        <article itemScope="" itemType="http://schema.org/BlogPosting" className="post">
          <header className="post__header">
            <FormattedDate date={this.state.meta.date} className="post__date" />
            <h1 itemProp="headline" className="post__heading">
              {this.state.meta.title}
            </h1>
          </header>
          <div dangerouslySetInnerHTML={{__html: JSON.parse(this.state.markup)}} itemProp="articleBody" className="post__content"></div>
        </article>
      </Layout>
    );
  }
});

module.exports = Post;
