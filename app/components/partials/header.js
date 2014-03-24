/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactRouter = require('react-router-component');
var Link = ReactRouter.Link;

var Header = React.createClass({

  render: function() {
    return (
      <header role="banner" className="page-header l-module"><span className="status">http ✔ (200)</span>
        <nav role="navigation" className="page-nav">
          <ul className="item-list">
            <li className="page-nav__index">
              <Link href="/">Home</Link>
            </li>
            <li className="page-nav__blog">
              <Link href="/posts">Blog</Link>
            </li>
            <li className="page-nav__about">
              <Link href="/about">About</Link>
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
