/**
 * @jsx React.DOM
 */

var React = require('react');

var TwitterFollow = React.createClass({
  render: function() {
    return (
      <div className="tw-follow">
         <a href="https://twitter.com/jonykrause" className="twitter-follow-button" data-show-count="false">Follow @jonykrause</a>
      </div>
    );
  }
});

var Adress = React.createClass({
  render: function() {
    return (
      <address className="address">
        <span itemprop="name">Jonathan Krause</span>
        <div className="is-hidden">
          <span itemprop="birthDate">06.07.1987</span><span itemprop="deathDate">unknown</span><span itemprop="image">http://jonykrau.se/images/jony-small.jpg</span><span itemprop="worksFor">Edenspiekermann AG</span>
        </div>
        <span className="sep">·</span><span itemprop="jobTitle" className="is-hidden">Front-end Developer</span><span itemscope="" itemprop="address" itemtype="http://schema.org/PostalAddress"><span itemprop="postalCode">10439</span><span itemprop="addressLocality"> Berlin</span></span>
        <div>
          <a href="mailto:jony@jonathan-krause.de" itemprop="email">jony@jonathan-krause.de</a>
          <TwitterFollow />
        </div>
      </address>
    );
  }
});
var VCard = React.createClass({
  render: function() {
    return (
      <div itemscope="" itemtype="http://schema.org/Person" className="vcard">
        <figure className="myface">
          <img alt="Picture of Jonathan Krause" width="66" height="66" src="img/jony-small.jpg" />
        </figure>
        <Adress />
      </div>
    );
  }
});

var Footer = React.createClass({

  render: function() {
    return (
      <footer role="contentinfo" className="page-footer l-module">
        <VCard />
      </footer>
    );
  }
});

module.exports = Footer;
