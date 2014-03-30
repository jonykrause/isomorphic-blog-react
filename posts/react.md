date: 2014-01-09
title: The value of React
---

In my last [post](http://jonykrau.se/posts/the-future-of-the-web-platform-a-tag-based-approach) I talked about Web Components and how they are claimed to bet future of the web platform. It was about three month ago when I first had a look at [React](https://github.com/facebook/react). Initially I thought it’s just another fancy MVC on the JavaScript horizon but then I got really excited about it. This is not a tutorial or introduction on how to use React but rather my thoughts on the foundational approach and how this contributes to the future web.


## The approach

Frequently modifying and haunting the **physical HTML DOM** is slow and a potential performance bottleneck for non trivial applications. React tries to solve this issue by introducing a **virtual JS DOM** representation. Using this, it is perfectly able to keep track of state when rendering UI components. When state changes it labels appropriate components as changed. At the end of the event loop, React looks at all changed-marked components and re-renders them batch-wise. This means only one physical DOM update during the event loop, which also just includes the minimal set of required changes. Using this technique React allows for super efficient and fast UI rendering. That’s basically what React is, a virtual DOM equipped with a nice API that lets you build hierarchical components, more on that later.
<blockquote class="quote">
If you treat the browser as a remote rendering engine and stop treating it as a place to query and store crap, everything gets faster. Sound like something familiar? Yeah, computer graphics programming.
<p><a target="_blank" href="http://swannodette.github.io/2013/12/17/the-future-of-javascript-mvcs/">David Nolen</a></p>
</blockquote>


## React and Web Components

An interesting question is whether React and Web Components can survive together or even partner up and if so, how? React basically provides a virtual DOM with rendering capabilities and Web Components is an umbrella term for an emerging group of specifications that describe new API primitives in the browser. It’s obvious that the philosophy of rendering components is quite different. Web Components embrace the physical HTML DOM and build upon that by extending it. React relies on the "virtual" JS DOM.

Nevertheless there are also things that they share. [Shadow DOM](http://www.w3.org/TR/components-intro/#shadow-dom-section) for example, which is part of the Web Components standards, addresses the HTML DOM encapsulation problem. It’s kinda funny, that this concept of hiding DOM functionality and putting it into its own scope in the "shadow" of a physical DOM node is something that (somehow) aims in the same direction. React only goes one step further and totally leaves the HTML DOM on its own. I can imagine one could pair those two techniques and use Shadow DOM as target for React rendered components.

Those components could use [Custom Elements](http://www.w3.org/TR/components-intro/#custom-element-section), also part of Web Components, as their entry points. React components encapsulate UI and UI logic which apparently belong together. This is also something Custom Elements strive for.

One difference where React components really shine is composeablity and interoperability – it’s providing this by embracing the nature of DOM cascade! Child components, in particular, can receive immutable properties »props« from their parent. Such an relationship is called [ownership](http://facebook.github.io/react/docs/multiple-components.html#ownership). Components that set props of other components are owners but not necessarily direct parents in terms of DOM structure. This data flow (one-way data binding) lets you elegantly compose components and build reusable widgets.


## Isomorphic JS components

With Node.js, JavaScript is an [isomorphic language](http://venturebeat.com/2013/11/08/the-future-of-web-apps-is-ready-isomorphic-javascript/), which means you can execute it on both, the client and the server. React powered components fully integrate into this concept. A js-based DOM does not need to hold meta information like layout and pixels, therefore rendering on the server is possible. That is, we are able to provide a fully "prerendered" HTML page initially, on first load. Later on we can reuse rendering logic and related code on the client side. This dramatically improves accessibility, maintainability and performance.

Web Components do not really offer a good way to render them server side. One thing that Custom Elements provide to prevent [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) is the CSS [pseudo class](https://codereview.chromium.org/14846002/) <code>:unresolved</code>. One can use this for styling purposes until the JavaScript is downloaded and the custom element registered. Patterns like they are used in native environments where a picture of a neutral state is shown while the app gets initialized, can so be emulated. When you have any experience or resources on rendering Web Components on the server, let me know :)

Having this abstract, virtual DOM already running on the server, why not make it even a browser built-in and let the browser care about physical DOM updates? Building a js-based DOM according to the "real" HTML DOM and providing some effective rendering/update algorithms sounds like a perfect task for the browser. I’m not sure if this is even possible, but at least it’s an interesting reasoning.


## Conclusion

Taking a step back and fundamentally rethinking rendering approaches is really inspiring and a thing the whole web can benefit from. When you first look at React it may feel odd, especially the [JSX part](http://facebook.github.io/react/docs/jsx-in-depth.html) of it. But I encourage you to take the time and fiddle around, it’s really worth it. Be open to its new techniques, the work Facebook’s engineers did here should really not be under-appreciated. I think its concepts totally have the potential of influencing future web standards.


## Additional Resources

- [Pete Hunt: React: Rethinking best practices JSConf EU 2013](http://www.youtube.com/watch?v=x7cQ3mrcKaY&feature=youtu.be)
- [Using React components as Backbone Views](http://www.thomasboyt.com/2013/12/17/using-reactjs-as-a-backbone-view.html)
- [React page, client-server rendering](https://github.com/facebook/react-page)
- [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
- [Docs Reconciliation](http://facebook.github.io/react/docs/reconciliation.html)
- [React touch demos](https://github.com/petehunt/react-touch)

