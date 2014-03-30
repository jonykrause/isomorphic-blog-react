/**
 * @jsx React.DOM
 */

var React = require('react');

var FormattedDate = React.createClass({
  getDateString: function() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(this.props.date);
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  },

  render: function() {
    return (
      <time dateTime={this.props.date} itemProp="datePublished" className={this.props.className}>
        { this.getDateString() }
      </time>
    );
  }
});

module.exports = FormattedDate;
