date: 2013-08-24
title: The future of the web platform, a tag-based approach?
---


Everyone is talking about them and in fact they are called to be **the future of the web platform** — »Web Components«. In this post I want to write down the current state of (Web) Components, mainly for my own reference, and also put some thoughts into this topic. I will not go into much technical implementation detail.

## What are Web Components?

As there is so much buzz around (Web) Components these days, I think it’s important to clarify what »Web Components« actually are. »Web Components« is an umbrella term for an emerging **group of specifications that describe new API primitives in the browser**. It has been around for like one and a half years. Right now it consists of:

- **Templates**, which define chunks of markup that are inert but can be activated for use later.
- **Decorators**, which apply templates based on CSS selectors to affect rich visual and behavioral changes to documents.
- **Custom Elements**, which let authors define their own elements, with new tag names and new script interfaces.
- **Shadow DOM**, which encapsulates a DOM subtree for more reliable composition of user interface elements.
- **Imports**, which defines how templates, decorators and custom elements are packaged and loaded as a resource.

There is a detailed introduction over at the [W3C Working Draft](http://www.w3.org/TR/components-intro/). Quite contrary to other W3C documents, this intro is actually quite a nice read. It describes the particular technologies well, in reasonable language. Having said that, I hope we won’t make »Web Components« the next HTML5 in terms of creating buzzwords that many people are wrong about.

## Toolkits
Right now we mainly have two "UI frameworks" that embrace »Web Components« as the specification describes them. The approach of  both is tag-based which means a UI component basically is implemented via a tag or custom element.

### Polymer (Google)
While still in pre-alpha [Polymer](http://www.polymer-project.org/) is fast evolving, growing and quite popular. It offers polyfills for [Shadow DOM](https://github.com/polymer/ShadowDOM), [Custom Elements](https://github.com/polymer/CustomElements) and [HTML Imports](https://github.com/polymer/HTMLImports). Platform technologies also include polyfills for the specifications of [Pointer Events](https://github.com/polymer/PointerEvents) and [Web Animations](https://github.com/web-animations/web-animations-js).


### X-Tag (Mozilla)
Compared to Polymer, [X-Tag](http://www.x-tags.org/) makes a more lightweight impression. It basically implements the [Custom Elements](http://www.w3.org/TR/components-intro/#custom-element-section) portion of Web Components. Therefor it currently make use of Polymer’s polyfills.


## Wait, a tag-based approach?
Let’s stop and think about this for a moment. What does this actually mean? For years we have been taught component-based software engineering that emphasizes the separation of concerns. The W3C itself describes [the principles of unobtrusive JavaScript](http://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript).
### How unobtrusive is a tag-based approach of writing true UI components?
Doesn’t all this lead to mixing things (presentation-wise) up and create poor JavaScript APIs? How should true components interoperate? What about component dependencies? When you look at Polymer, it’s quite a big "framework" that keeps growing. Doesn’t it solve too many problems? Do you guys remember Silverlight and how it uses [XAML](http://en.wikipedia.org/wiki Extensible_Application_Markup_Language). Is a [TodoMVC](http://todomvc.com/architecture-examples/polymer/index.html) really a good use case for Polymer? Isn't a component decoupled from application architecture? Nowadays, the community is moving away from jQueryPluginifying all the things. Isn’t producing a component with the help of "frameworks" like Polymer somehow identical to writing a jQuery plugin? These are some questions I recently asked myself and I’m still not really sure about. What I know is that it’s super important to teach best practices on how to use these "frameworks" in a proper way. Of course these technologies are awesome and we definitely need to explore and fiddle around with them. Of course each portion of »Web Components« has its own use case. I think, what I want to say is, we really should use and announce these powerful APIs and technologies responsively and not go crazy about them just because we can. As always these are just my two cents and I’m curious on how things evolve. If you have opinions or any further thoughts about this topic, I’d love to hear them!

## Alternative approaches not necessarily related to Web Components
- [Component](https://github.com/component/component) — Its great focus on building decoupled components makes it worth mentioning here. The philosophy behind it totally makes sense. You should definitely check it out!
- [Yarnify](https://github.com/substack/yarnify) — I guess, not very popular but it’s quite amazing. Quote: »Knit together html, css, and javascript into reusable browserifiable bundles with minimal side effects. All the classes, IDs, and css selectors in the knitted files are transformed with a prefix value to ensure that no conflicts with existing class names will occur when deploying a widget into an unknown environment.«




## Resources
- [W3C Introduction to Web Components](http://www.w3.org/TR/components-intro/)
- [Implementation Status](http://jonrimmer.github.io/are-we-componentized-yet/) — Are we componentized yet?
- [Web Components Best Practices](https://docs.google.com/document/d/1lbWrU0qsGMijDwzYNttUw352lUhfU7DJW4yxA_A8hq4/edit#) — Google Doc.
- [Web Components Resources](https://gist.github.com/ebidel/6314025) — Gist by @ebidel.
- [Polymer and front-end tooling](http://www.youtube.com/watch?v=EwQkyplZHDY&list=WLP-0-XlpaagvMlnQJhmz4Z-13Ya5vT6RT) — Interesting video by @addyosmani.

### (Web) Component Registries and Samples
- [component.io](http://component.io/)
- [Polymer Elements](http://www.polymer-project.org/docs/elements/) — Collection of Polymer Elements.
- [customelements.io](http://customelements.io/) — General registry, currently refers to UI components built with either X-Tags or Polymer.
- [X-Tag Registry](http://registry.x-tags.org/)
- [Brick](http://mozilla.github.io/brick/) — Bundle of re-usable UI components built with X-Tags.




