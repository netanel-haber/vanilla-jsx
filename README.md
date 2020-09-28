<h3>What is this?</h3>

This boilerplate has everything needed in order to use JSX with vanilla js:
- a basic, unoptimized dom function for element creation 
- a webpack setup to easily allow modular code.

An example: 
```
<App darkMode={false}>
  <div click={()=>{alert("hooray"!)}}>
    Hello Vanilla JSX!
  <div>
</App>
```

**Note: Everything is untested, hooray! Issues appreciated.**


<br/>
<h3>Getting Started</h3>

1. `npm install`
2. `npm run hot-dev-server` - this will fire up webpack build on watch mode, and webpack-dev-server.
3. All important code is in the 'dom' folder under src - most important is dom.js which is the function that babel substitutes for jsx.

<p>
<strong>JSX</strong>: end your filename with `.jsx` instead of `.js`, and webpack (using [string-replace-loader](https://www.npmjs.com/package/string-replace-loader)) will auto-insert the import necessary for writing jsx. You can also do this yourself, but why bother.
</p>

<p>
<strong>Custom components</strong>: supported out of the box using the React-like props object API (inluding children).
</p>

<br/>
   
<h3>Caveats and Features</h3>

**Events**: I used the addEventListener event-type strings ("click", not "onClick") [described here](https://developer.mozilla.org/en-US/docs/Web/Events) - an inline set of these is generated in src/dom/utils/eventTypes and checked against when a function prop on a native HTML object (i.e. div etc.) is detected - if the propname is unrecognized an error is thrown. 

so `<div click={()=>{}}/>` is legal, whereas **`<div handler={()=>{}}/>` will throw**.
  
**Styling**: I added in a styled components wrapper that uses [emotion](https://www.npmjs.com/package/emotion) and a very simple usage of the [proxy API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). So that's neat.
If you don't like the bloat - you should uninstall emotion and just delete styled.js from the dom folder.

I wrote this wrapper to basically match the [styled-components](https://github.com/styled-components/styled-components) API, which I like. So for example:
   - `styled.button` or `styled["button"]` or `styled("button")` should all work.
   - `styled(CustomComponent)` should work for custom components.

**Fragments** are not supported.

**Browser support**: When I am not being payed for code I like to not be in constant pain. so I freely used `Proxy`, `fromEntries`, `entries`, `spread` etc. I didn't wan't to include babel and polyfill desicions in order to prevent bloat.

