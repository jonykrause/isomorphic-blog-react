/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var Prev = React.createClass({
  render: function() {
    return (
      this.props.prev === 'undefined' ?
        <span className="post__prev is-missing">« Newer </span> :
        <span className="post__prev"><Link href={'/posts/' + this.props.prev}>« Newer</Link></span>
    );
  }
});

var Next = React.createClass({
  render: function() {
    return (
      this.props.next === 'undefined' ?
        <span className="post__next is-missing">Older »</span> :
        <span className="post__next"><Link href={'/posts/' + this.props.next}>Older »</Link></span>
    );
  }
});

var Pagination = React.createClass({
  render: function() {
    return (
      <nav className="post__nav">
        <Prev prev={this.props.prev} />
        <Next next={this.props.next} />
      </nav>
    );
  }
});

module.exports = Pagination;
