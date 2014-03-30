/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var FormattedDate = require('./formattedDate');
var Link = ReactRouter.Link;


// TODO: Find better way to make linkposts work
var PostLink = React.createClass({
  renderLink: function() {
    return !this.props.linkpost ?
      <Link href={'/posts/' + this.props.url} itemprop="url" className="post-list__item">{ this.props.children }</Link> :
      <a target="_blank" href={this.props.linkpost} itemprop="url" className="post-list__item">{ this.props.children }</a>
  },

  render: function() {
    return (
      <div>
        { this.renderLink() }
      </div>
    );
  }
});


var Post = React.createClass({
  render: function() {
    return (
      <li>
        <article itemScope="" itemType="http://schema.org/BlogPost">
          <PostLink url={this.props.slug} linkpost={this.props.linkpost}>
            <FormattedDate date={this.props.date} className="post-list__date" />
            <h2 itemProp="headline" className="post-list__heading">
              { this.props.title }
            </h2>
          </PostLink>
        </article>
      </li>
    );
  }
});

module.exports = Post;
