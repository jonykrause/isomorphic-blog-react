/**
 * @jsx React.DOM
 */

var React = require('react');
var Layout = require('../layout');

var About = React.createClass({
  render: function() {
    return (
      <Layout>
        <article className="post">
          <header>
            <h1 itemprop="headline" className="post__heading">About me</h1>
          </header>
          <div itemprop="articleBody" className="post__content">
            <figure className="myface--big">
              <img alt="Picture of Jonathan Krause" width={220} height={220} src="/img/jony.jpg" />
            </figure>
            <p>Hey, my name is Jonathan Krause — I would call myself a front-end developer (you know those job titles). I am currently living in Berlin, Germany, working full-time at<a href="http://www.edenspiekermann.com"> Edenspiekermann</a>. I am a passionate
              web developer, believing in Unix philosophy form- and function-wise. I love effective and fast user interfaces that bring real value to people. I appreciate logical, user-centered design approaches. Therefore I strive to use technologies and
              methodologies that deliver the best possible user experience, trying to concentrate on simple, focused and concise development.</p>
            <p>I like tinkering with front-end performance, the latest HTML, CSS and especially JavaScript stuff. To complete the story, I want to mention that I have a degree in application development and in the past used to work in the more enterprise-oriented
              business. Besides that I love dogs, aquariums, nature, riding motorbikes and enjoy people that take themselves not too seriously.</p>
            <p>This is version three of my website. You can also have a look back at<a href="http://v1.jonathan-krause.de/"> version one</a> and<a href="http://v2.jonathan-krause.de/"> version two</a>, if interested. With version three I forced myself to write
              English to improve my language skills. So there are german as well as english posts on this blog.</p>
            <p>Feel free to<a href="http://twitter.com/?status=%20@jonykrause%20"> send me a tweet</a> or just<a href="mailto:jony@jonathan-krause.de"> drop me an email</a> whenever you want. You can find me also on<a href="https://github.com/jonykrause"> Github</a> and
              occasionally on<a href="https://www.xing.com/profile/Jonathan_Krause3"> Xing</a> or<a href="http://de.linkedin.com/pub/jonathan-krause/69/294/b42"> LinkedIn</a>.</p>
            <h2>Colophon</h2>
            <p>This site is built on<a href="http://expressjs.com/"> Express.js</a> and is the outcome of experimenting with Node.js. A basic description of the implementation can be found<a href="http://jonykrau.se/posts/a-simple-blog-built-with-express-and-backbone"> here</a>.
              It’s hosted with the help of lovely<a href="http://nodejitsu.com/"> Nodejitsu</a>, a super simple and powerful Node.js hosting platform.</p>
          </div>
        </article>
      </Layout>
    );
  }
});

module.exports = About;
