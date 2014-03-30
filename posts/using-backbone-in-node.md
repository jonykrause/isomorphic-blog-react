date: 2013-03-10
title: A simple Blog built with Express and Backbone
---


One thing I want to mention initially: As with any other posts here, I don’t want to claim anything I write/show is the #1 way to go. I think there are, especially in front-end dev, many many solutions to problems and none of them are necessarily wrong or right. **I don’t want school** anybody, I just want to document and share my personal discoveries.

In this post I give a short overview on how I built my new blog using [Express.js](http://expressjs.com). The basic scaffolding can be found [here](https://github.com/jonykrause/express-jade-coffee-compass-mocha). As the headline states, I also used [Backbone.js](http://backbonejs.org/). Using Backbone structures on the server-side is something I wasn’t completely sold on but in the end it turned out to be very useful and I’m glad I chose it. The first major benefit was that it helped me a structure my code more properly. Basically the app consists of **Models**, a **Collection** of these, **Routes** and **Controllers** that handle those. I’m not going too much into detail, showing only crucial code passages.



## Model
Let’s start from the inside out and begin with the most important stuff, the data. What I do is basically parse Markdown files. Each Post is transformed into a Backbone Model and added to a, let’s call it, "Post Collection". At the moment all of those Markdown files are located in a separate folder on the server. One could also store these files elsewhere, for example fetching file contents from Github or having them in a Dropbox folder. In the end it’s just about creating proper data structures.

So let’s have a quick look at the Model. What we actually can see is a Post »Class« that inherits Backbone Model functionality. When an instance of such a Model is created its attributes are filled by real data which is the result of parsing the actual file and extracting relevant information.


```js
// Module dependencies
var md = require('node-markdown').Markdown,
    highlighter = require('./modules/highlighter');

// ...

Post = Backbone.Model.extend({
  initialize: function(filecontent, file) {
    var lines = filecontent.split('\n');
    return this.set({
      tstamp: file.mtime,
      heading: this.toHeading(lines),
      linkpost: this.checkLinkPost(lines),
      slug: this.slugify(lines),
      posted: this.getPostedTime(file.mtime),
      html: highlighter.highlight(md(data))
    });
  }
});
// ...
```


To parse the Markdown file and transform it to HTML I used [node-markdown](https://github.com/andris9/node-markdown). You may have noticed the <code>highlighter</code> module dependency. This module exports a function that takes HTML and highlights code snippet syntax. At first glance I tried [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) but unfortunately the highlighting results were disappointing. Also the outcome of porting [Prism.js](http://prismjs.com/) to work on Node wasn’t that satisfying. In the end I chose [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/) which does the job properly.


## Collection
The Collection of Post Models is the heart of the application. The Posts »Class« inherits Backbone Collection functionality. When the Collection is initialized it collects all Posts from a given directory and subsequently reads all the Markdown files. For each file a corresponding Model is created and added to the Collection. The Models are automatically sorted with the help of the <code>comparator</code> function.

When all of the files are read and »modelified« I set an index on the Collection — basically to be able to implement previous/next post cycling quite easily. Another thing that happens at this point is creating a RSS feed based on the generated Collection. Therefor I used the RSS feed generator [node-rss](https://github.com/dylang/node-rss). Lastly I use Backbone itself as kind of a global event emitter to trigger an event <code>collection:set</code>. Bootstraping the application solely depends on that event (more about that later).



```js
// Module dependencies

var RSSFeed = require('./modules/rss');

var Posts = Backbone.Collection.extend({
  model: Post,
  dir: './public/posts',


  // By initializing a new collection fetch posts from dir

  initialize: function() {
    this.collectPosts(this.dir);
    this.on('posts:collected', this.readPosts.bind(this, this.dir));
    return this.on('posts:read', this.finish);
  },


  // Sort by timestamp DESC

  comparator: function(model) {
    return -model.get('tstamp');
  },


  // Set initial Index and generate RSS Feed

  finish: function() {
    this.setIndex(this.at(0));
    this.rssFeed = new RSSFeed;
    this.rssFeed.populate(this);

    // Signal when collection is all set up
    return Backbone.trigger('collection:set');
  },


  // Sets the current index of the collection

  setIndex: function(model) {
    this.currentIndex = this.indexOf(model);
    return this;
  },

  // Store relevant file names as reference

  collectPosts: function(dir) {
    this.mdFiles = [];
    var _this = this;
    // Read dir and temp save files.md
    fs.readdir(dir, function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        if (file.split('.').pop() === 'md') {
          return _this.mdFiles.push(file);
        }
      });
      // Signal end of collecting
      return _this.trigger('posts:collected');
    });
  },


  // Read files according to collected file names

  readPosts: function(dir) {
    var _this = this;
    this.mdFiles.forEach(function(mdFile, i) {
      fs.readFile(dir + '/' + mdFile, 'utf-8', function(err, data) {
        if (err) throw err;
        // Create Model and add to Collection
        var post = new Post(data, mdFile);
        _this.add(post);
        // Signal when all files read
        if (i === _this.mdFiles.length - 1) {
          return _this.trigger('posts:read');
        }
      });
    });
  }

  // ...
});

```



## Routing

Setting up the Routes is pretty straight forward. I use a config file to define all pages and meta data. When starting the application the config gets evaluated and Routes are dynamically generated.


```js
      exports.config = {
        SITE_TITLE: ' – Jonathan Krause @jonykrause, Front–end developer',
        pages: [
          {
            index: {
              slug: '/',
              view: 'index',
              title: 'Home'
            },
            blog: {
              slug: '/posts',
              view: 'blog',
              title: 'Blog'
            },
            post: {
              slug: '/posts/:id',
              view: 'post'
            // ...
          }
        ]
      };

```

While defining a default controller for static pages, dynamic pages, that need extra data passed are assigned to their corresponding view-controller in <code>./controllers.js</code>. »The Router« itself is basically nothing more than the following lines of code:


```js
      var pages = require('./config').config.pages[0],
          ctrls = require('./controllers');

      module.exports = function(app) {
        // Create routes according to config
        var callback, key, val;
        for (key in pages) {
          val = pages[key];
          if (ctrls[key] != null) {
            callback = ctrls[key];
          } else {
            callback = ctrls["default"];
          }
          app.get(val.slug, callback);
        }
        // ...
```



## Controller
To help me render pages I created something I called <code>ViewController</code>. It’s a small »Class« equipped with some helper-methods. Basically it lets me hook into rendering and pass custom data. Instances automatically extend Backbone Events functionality. As I already used Backbone Events to handle the data, I thought I would also continue using it here.

```js
      // Module dependencies

      var collection = require('./collection'),
          Backbone = require('backbone'),
          _ = require('underscore'),
          cfg = require('./config').config,
          pages = cfg.pages[0];

      var ViewController = (function() {

        function ViewController() {
          _.extend(this, Backbone.Events);
        }

        ViewController.prototype.route = function(req, res, page, data) {
          if (page != null) {
            this.trigger('before:render', page);
            this.render(req, res, page, data);
            return this.trigger('after:render', page);
          } else {
            throw new TypeError('View not found');
          }
        };

        ViewController.prototype.render = function(req, res, page, data) {
          return res.render(page.view, {
            page: page.view,
            title: this.getPageTitle(page, divata),
            posts: data ? data.posts : void 0
          });
        };

        ViewController.prototype.getPageTitle = function(page, data) {
          return page.title ? page.title + cfg.SITE_TITLE : data.title;
        };

        return ViewController;

      })();

      // ...
```



Then subsequently I use the <code>ViewController</code> to handle rendering of pages that need special data. For instance; the /blog page currently gets passed all existing models and thus posts. The /posts:id page gets passed the model according to the requested slug. In addition, depending on the <code>currentModel</code>, the collection’s index and its previous/next post is set (if not already existing).


```js
      // ...

      // create ViewController
      var viewCtrl = new ViewController;

      // default render function for static pages
      exports.default = function(req, res) {
        return viewCtrl.route(req, res, _.where(pages, {
          slug: req.route.path
        })[0]);
      };

      // blog – render with collection
      exports.blog = function(req, res) {
        return viewCtrl.route(req, res, pages.blog, {
          posts: collection.models
        });
      };

      // post detail – render with corresponding model
      exports.post = function(req, res) {

        // get current model
        var currentModel = collection.where({
          slug: req.params.id
        })[0];

        // handle 404s
        if (!(currentModel != null)) {
          return viewCtrl.route(req, res, pages.dafuq);
        }

        // set collection index and prev/next
        collection.setIndex(currentModel);
        collection.setNeighbours(currentModel);

        // render view
        return viewCtrl.route(req, res, pages.post, {
          posts: currentModel,
          title: currentModel.get('heading') + cfg.SITE_TITLE
        });
      };

      // ...
```



## Bootstrapping

In the main file, <code>app.js</code>, I basically do environment configuring such as caching for production or setting a special logger for development. Requiring the <code>./routes.js</code> file starts the process of reading the post directory and adding models to the collection. Like I mentioned before, I use a Backbone Event to signal when the collection is all set up and then invoke starting the web server depending on that.


```js
      // ...

      // inject router
      app.use(app.router);


      // require routes
      require('./routes')(app);


      // start the server as soon as the collection is set
      Backbone.on('collection:set', function() {
        var server = http.createServer(app);
        return server.listen(app.get('port'));
      });

```


That’s basically all of it. So far I like the above structures, though, there is room for improvement. For me it’s really important to see **Backbone** as a **little friend** rather than a big framework. Actually it’s not doing that much for you, though it comes in handy when dealing event-based with data.
