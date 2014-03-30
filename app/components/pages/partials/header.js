/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var ActiveLink = React.createClass({
  mixins: [ReactRouter.NavigatableMixin],
  isActive: function() {
    return this.getPath() === this.props.href
  },
  render: function() {
    var className;
    if (this.props.activeClassName && this.isActive()) {
      className = this.props.activeClassName
    }
    var link = Link({className: className}, this.props.children)
    return this.transferPropsTo(link)
  }
});


var Header = React.createClass({
  render: function() {
    return (
      <header role="banner" className="page-header l-module"><span className="status">http ✔ (200)</span>
        <nav role="navigation" className="page-nav">
          <ul className="item-list">
            <li className="page-nav__index">
              <ActiveLink href="/" activeClassName="is-active">Home</ActiveLink>
            </li>
            <li className="page-nav__blog">
              <ActiveLink href="/posts" activeClassName="is-active">Blog</ActiveLink>
            </li>
            <li className="page-nav__about">
              <ActiveLink href="/about" activeClassName="is-active">About</ActiveLink>
            </li>
            <li>
              <a href="https://twitter.com/jonykrause">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/jonykrause">Github</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
