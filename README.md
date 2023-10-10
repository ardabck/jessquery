# jessquery 🚀

`jessquery` is a lightweight wrapper around the DOM API that offers the intuitive elegance of jQuery, but streamlined for the modern web.

Feel like a 🦕 for still using jQuery? Wish that it didn't use up so much of your bundle size like a 🐖? Want something a little more 🆕✨?

Rekindle your love for method chaining, now in a lightweight, predictable package. Seamlessly handle asynchronous tasks, customize error behaviors, and ensure actions flow smoothly one after the other. And, the best part? 🏎️💨

| Library   | Size before gzip | Size after gzip |
| --------- | ---------------- | --------------- |
| jQuery    | 88.3kb           | 31.7kb          |
| jessquery | 5.22kb           | 2.07kb          |

https://deno.bundlejs.com/badge?q=jessquery@2.1.0&treeshake=[*]

## Usage

```javascript
import { $, $$, promisify, setErrorHandler } from "jessquery"

// Use $ to select a single element.
const display = $(".display")
const button = $("#button")

// Use $$ to select multiple elements.
const buttons = $$(".buttons")

// These elements are now wrapped in a proxy with extra methods.
// They each have an internal queue that always executes in order.
// So, the chains are not only convenient and readable, but they're also predictable.

// You can even do async stuff!
async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch("https://api.github.com/users/jazzypants1989")
  const data = await response.json()
  return data.name
}

// promisify is for setTimeout/anything async that doesn't return a promise.
// (You can also just return a promise yourself if you want.)
const onlyWarnIfLoadIsSlow = promisify((resolve) => {
  setTimeout(() => {
    // Each proxy has full access to the DOM API-- useful for conditional logic.
    if (display.textContent === "") {
      resolve("Loading...")
      // With promisify, reject will automatically throw an error and call the default error handler.
    }
  }, 200)
})

// The default error handler catches all errors and promise rejections
// But, you can override it if you want to do something else.
setErrorHandler((err) => {
  sendErrorToAnalytics(err)
})

// Every promise is resolved automatically
// The next function never runs until the previous one is finished.
button.on("click", () => {
  display
    .text(onlyWarnIfLoadIsSlow()) // NEVER shows text UNLESS data doesn't load in 200ms
    .text(fetchData()) // You don't have to await anything. It will just work!
    .css("background-color", "red") // This won't happen until the fetch is done.
})

// Most things follow the DOM API closely
// But, now you can chain them together
// They will always execute in order!
const fadeIn = [{ opacity: 0 }, { opacity: 1 }] // WAAPI keyframes
const fadeOut = [{ opacity: 1 }, { opacity: 0 }] // WAAPI keyframes
const oneSecond = { duration: 1000 } // WAAPI options

buttons
  .addClass("btn")
  .text(
    "These buttons will animate in 2 seconds. They will fade in and out twice then disappear."
  )
  .wait(2000)
  .animate(fadeIn, oneSecond)
  .animate(fadeOut, oneSecond)
  .animate(fadeIn, oneSecond)
  .animate(fadeOut, oneSecond)
  .remove()
```

## Installation

You can install it via NPM, PNPM, Yarn, or Bun just like anything else on NPM.

```bash
npm install jessquery
pnpm install jessquery
yarn add jessquery
bun install jessquery
```

Or, since it's so small, you can just use a CDN like the good, old days. The big problem with this is that you lose the types and the JSDoc annotations. I keep those in the `d.ts` file to keep the file size small, but I recently learned that gzip takes care of that for you. So, I'll probably change that in the future. For now, you can just use the `index.d.ts` file in your project if you want the types without installing the package.

```html
<script src="https://esm.sh/jessquery"></script>
<script src="https://unpkg.com/jessquery"></script>
```

## The Rules

1. Use `$` to operate on a single element
2. Use `$$` for operating on multiple elements at once.
3. All custom methods can be chained together.
4. _ALL_ DOM API's can be used, but they **MUST COME LAST** in the chain. You can always start a new chain if you need to.
5. _ALL_ `jessquery` methods are setters that return the proxy. If you need to check the value of something, just use the DOM API directly.
6. All chains are begun in the order they are found in the script, but they await any microtasks or promises found before continuing.
7. Synchronous tasks are always executed immediately unless they are preceded by an async task. In that case, they will be added to the queue and executed in order.
8. Each chain gets its own queue but they are all executed concurrently, so you can have multiple chains operating on the same element at the same time.

Generally, just try to keep all your DOM operations for a single element together in a single chain. This isn't always possible, but you can usually separate them into discrete units of work. If anything gets hard, just use the `wait` method to let the DOM catch up while you re-evaluate your life choices. 😅

## Demo and Key Concepts

Here's a [Stackblitz Playground](https://stackblitz.com/edit/jessquery?file=main.js) if you want to try it out. It works slightly differently from jQuery, but it makes sense once you understand the rules. It's a bit more like [PrototypeJS](http://prototypejs.org/doc/latest/dom/dollar-dollar/) mixed with the async flow of something like [RxJS](https://rxjs.dev/guide/overview).

The magic sauce here is that everything is a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), so you can still use the full DOM API if your use case isn't covered by one of the methods. So, if you forget about the `.css` operator and use `.style` instead when using `$`, it will just work. The NodeList that you get from `$$` is automatically turned into an array so you can use array methods on it like `.map` or `.filter`.

This is the benefit of using proxies, but I'm curious if this will scale well as they bring a tiny bit of overhead. This might get problematic in large applications, but I'm probably just being paranoid. I welcome anyone to do some tests! 😅

## Interfaces

### Table of Contents

- [$()](#$)
- [$$()](#$$)
- [DomProxy](#DomProxy)
  - [DomProxy Methods](#DomProxy-Methods)
    - [DomProxy.on](#DomProxyon)
    - [DomProxy.once](#DomProxyonce)
    - [DomProxy.off](#DomProxyoff)
    - [DomProxy.delegate](#DomProxydelegate)
    - [DomProxy.html](#DomProxyhtml)
    - [DomProxy.sanitize](#DomProxysanitize)
    - [DomProxy.text](#DomProxytext)
    - [DomProxy.val](#DomProxyval)
    - [DomProxy.css](#DomProxycss)
    - [DomProxy.addStyleSheet](#DomProxyaddStyleSheet)
    - [DomProxy.addClass](#DomProxyaddClass)
    - [DomProxy.removeClass](#DomProxyremoveClass)
    - [DomProxy.toggleClass](#DomProxytoggleClass)
    - [DomProxy.set](#DomProxyset)
    - [DomProxy.unset](#DomProxyunset)
    - [DomProxy.toggle](#DomProxytoggle)
    - [DomProxy.data](#DomProxydata)
    - [DomProxy.attach](#DomProxyattach)
    - [DomProxy.cloneTo](#DomProxycloneTo)
    - [DomProxy.moveTo](#DomProxymoveTo)
    - [DomProxy.replaceWith](#DomProxyreplaceWith)
    - [DomProxy.remove](#DomProxyremove)
    - [DomProxy.animate](#DomProxyanimate)
    - [DomProxy.wait](#DomProxywait)
    - [DomProxy.do](#DomProxydo)
    - [DomProxy.parent](#DomProxyparent)
    - [DomProxy.siblings](#DomProxysiblings)
    - [DomProxy.children](#DomProxychildren)
    - [DomProxy.pick](#DomProxypick)
    - [DomProxy.closest](#DomProxyclosest)
- [DomProxyCollection](#DomProxyCollection)
  - [DomProxyCollection Methods](#DomProxyCollection-Methods)
    - [DomProxyCollection.on](#DomProxyCollectionon)
    - [DomProxyCollection.once](#DomProxyCollectiononce)
    - [DomProxyCollection.off](#DomProxyCollectionoff)
    - [DomProxyCollection.delegate](#DomProxyCollectiondelegate)
    - [DomProxyCollection.html](#DomProxyCollectionhtml)
    - [DomProxyCollection.sanitize](#DomProxyCollectionsanitize)
    - [DomProxyCollection.text](#DomProxyCollectiontext)
    - [DomProxyCollection.val](#DomProxyCollectionval)
    - [DomProxyCollection.css](#DomProxyCollectioncss)
    - [DomProxyCollection.addStyleSheet](#DomProxyCollectionaddStyleSheet)
    - [DomProxyCollection.addClass](#DomProxyCollectionaddClass)
    - [DomProxyCollection.removeClass](#DomProxyCollectionremoveClass)
    - [DomProxyCollection.toggleClass](#DomProxyCollectiontoggleClass)
    - [DomProxyCollection.set](#DomProxyCollectionset)
    - [DomProxyCollection.unset](#DomProxyCollectionunset)
    - [DomProxyCollection.toggle](#DomProxyCollectiontoggle)
    - [DomProxyCollection.data](#DomProxyCollectiondata)
    - [DomProxyCollection.attach](#DomProxyCollectionattach)
    - [DomProxyCollection.cloneTo](#DomProxyCollectioncloneTo)
    - [DomProxyCollection.moveTo](#DomProxyCollectionmoveTo)
    - [DomProxyCollection.replaceWith](#DomProxyCollectionreplaceWith)
    - [DomProxyCollection.remove](#DomProxyCollectionremove)
    - [DomProxyCollection.animate](#DomProxyCollectionanimate)
    - [DomProxyCollection.wait](#DomProxyCollectionwait)
    - [DomProxyCollection.do](#DomProxyCollectiondo)
    - [DomProxyCollection.parent](#DomProxyCollectionparent)
    - [DomProxyCollection.siblings](#DomProxyCollectionsiblings)
    - [DomProxyCollection.children](#DomProxyCollectionchildren)
    - [DomProxyCollection.pick](#DomProxyCollectionpick)
    - [DomProxyCollection.closest](#DomProxyCollectionclosest)
- [setErrorHandler](#setErrorHandler)
- [promisify](#promisify)

### $()

- **$(selector: string): DomProxy**
  - Finds the first element in the DOM that matches a CSS selector and returns it with some extra, useful methods.
  - These methods can be chained together to create a sequence of actions that will be executed in order (including asynchronous tasks).
  - Every method returns a DomProxy or DomProxyCollection object, which can be used to continue the chain.
  - Example:

```javascript
$("#button")
  .on("click", () => console.log("Clicked!"))
  .css("color", "purple")
  .wait(1000)
  .css("color", "lightblue")
  .text("Click me!")
```

### $$()

- **$$(selector: string): DomProxyCollection**

  - Finds all elements in the DOM that match a CSS selector and returns them with some extra, useful methods
  - These methods can be chained together to create a sequence of actions that will be executed in order (including asynchronous tasks).
  - Every method returns a DomProxy or DomProxyCollection object, which can be used to continue the chain.

  - Example:

```javascript
$$(".buttons")
  .on("click", () => console.log("Clicked!"))
  .css("color", "purple")
  .wait(1000)
  .css("color", "lightblue")
  .text("Click me!")
```

### DomProxy

A proxy covering a single HTML element that allows you to chain methods sequentially (including asynchronous tasks) and then execute them all at once.

#### DomProxy Methods

##### DomProxy.on

**on(ev: string, fn: EventListenerOrEventListenerObject): DomProxy**

- Adds an event listener to the element.
- Example: `$('button').on('click', () => console.log('clicked'))`

##### DomProxy.once

**once(ev: string, fn: EventListenerOrEventListenerObject): DomProxy**

- Adds an event listener to the element that will only fire once.
- Example: `$('button').once('click', () => console.log('clicked'))`

##### DomProxy.off

- **off(ev: string, fn: EventListenerOrEventListenerObject): DomProxy**

  - Removes an event listener from the element.
  - Example: `$('button').off('click', () => console.log('clicked'))`

##### DomProxy.delegate

- **delegate(event: string, subSelector: string, handler: EventListenerOrEventListenerObject): DomProxy**

  - Delegates an event listener to the element.
  - Example: `$('.container').delegate('click', '.buttons', (e) => console.log('Button clicked'))`

##### DomProxy.html

- **html(newHtml: string): DomProxy**

  - Change the HTML of the element with an **UNSANITIZED** string of new HTML. This is useful if you want to add a script tag or something. If you want to sanitize the HTML, use `sanitize` instead.
  - Example: `$('button').html('<span>Click me!</span>')`

##### DomProxy.sanitize

- **sanitize: (html: string, sanitizer?: (html: string) => string) => DomProxy**

  - Sanitizes a string of untusted HTML, then replaces the element with the new, freshly sanitized HTML. This helps protect you from XSS Attacks. It uses the setHTML API under the hood, so you can provide your own sanitizer if you want with a second argument.
  - Example:

  ```javascript
  const maliciousHTML =
    '<span>Safe Content</span><script>alert("hacked!")</script>'
  const customSanitizer = new Sanitizer({
    allowElements: ["span"],
  })
  $("button").sanitize(maliciousHTML, customSanitizer)
  // The button will only contain the 'Safe Content' span;
  // Any scripts (or other unwanted tags) will be removed.
  // Only span elements will be allowed.
  ```

  - MDN Documentation: [setHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML)

##### DomProxy.text

- **text(newText: string): DomProxy**

  - Changes the text of the element while retaining the tag.
  - Example: `$('button').text('Click me!')`

##### DomProxy.val

- **val(newValue: string | number | (string | number)[] | FileList): DomProxy**

  - Changes the value of the element based on its type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
  - Example: `$('input[type="text"]').val('New Value')`
  - Example: `$('input[type="checkbox"]').val(true)`
  - Example: `$('input[type="radio"]').val('radio1')`
  - Example: `$('input[type="file"]').val(myFileList)`
  - Example: `$('select[multiple]').val(['option1', 'option2'])`

##### DomProxy.css

- **css(prop: string | Record<string, string>, value?: string): DomProxy**

  - Adds one or more CSS Rules to the element. If the first argument is an object, each key-value pair will be added as a CSS Rule. If the first argument is a string, it will be treated as a CSS property and the second argument will be treated as its value.
  - Example: `$('button').css('color', 'red')`
  - Example: `$('button').css({ color: 'red', backgroundColor: 'blue' })`

##### DomProxy.addStyleSheet

- **addStyleSheet(cssString: string): DomProxy**

  - Adds a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got an good idea for how to make this scoped to a single element? Open a PR!
  - Example: `$('button').addStyleSheet('button:hover { color: red }')`

##### DomProxy.addClass

- **addClass(className: string): DomProxy**

  - Adds a class to the element.
  - Example: `$('button').addClass('btn')`

##### DomProxy.removeClass

- **removeClass(className: string): DomProxy**

  - Removes a class from the element.
  - Example: `$('button').removeClass('btn')`

##### DomProxy.toggleClass

- **toggleClass(className: string): DomProxy**

  - Toggles a class on the element.
  - Example: `$('button').toggleClass('btn')`

##### DomProxy.set

- **set(attr: string, value: string?): DomProxy**

  - Sets an attribute on the element. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
  - Example: `$('button').set('disabled')`

##### DomProxy.unset

- **unset(attr: string): DomProxy**

  - Removes an attribute from the element.
  - Example: `$('button').unset('disabled')`

##### DomProxy.toggle

- **toggle(attr: string): DomProxy**

  - Toggles an attribute on the element.
  - Example: `$('button').toggle('disabled')`

##### DomProxy.data

- **data(key: string, value?: string): DomProxy**

  - Sets a data attribute on the element.
  - Example: `$('button').data('id', '123')`

##### DomProxy.attach

- **attach(...children: (HTMLElement | DomProxy)[]): DomProxy**

  - Attaches children to the element based on the provided options.
  - The children can be:
    - A string of HTML
    - A CSS selector
    - An HTMLElement
    - A DomProxy
    - An array of any of the above
  - The position can be:
    - 'append' (default): Adds the children to the end of the element.
    - 'prepend': Adds the children to the beginning of the element.
    - 'before': Adds the children before the element.
    - 'after': Adds the children after the element.
  - The HTML is sanitized by default, which helps prevent XSS attacks.
  - If you want to disable sanitization, set the `sanitize` option to `false`.
  - Example: `$('button').attach('<span>Click me!</span>')`
  - Example: `$('button').attach($('.container'), { position: 'prepend' })`
  - Example: `$('button').attach([$('.container'), '<span>Click me!</span>'], { position: 'before' })`
  - Example: `$('button').attach('<image src="x" onerror="alert(\'hacked!\')">')` // No XSS attack here!
  - Example: `$('button').attach('<image src="x" onerror="alert(\'hacked!\')">', { sanitize: false })` // XSS attack here!
  - [Handy StackOverflow Answer for Position Option](https://stackoverflow.com/questions/14846506/append-prepend-after-and-before)

##### DomProxy.cloneTo

- **cloneTo(parentSelector: string, options?: { position: string; all: boolean }): DomProxy**

  - Clone of the element to a new parent element in the DOM. The original element remains in its current location. If you want to move the element instead of cloning it, use `moveTo`.

  - The position can be:

    - 'append' (default): Adds the children to the end of the parent.
    - 'prepend': Adds the children to the beginning of the parent.
    - 'before': Adds the children before the parent.
    - 'after': Adds the children after the parent.

  - The all option will clone the element into each new parent in the collection. If the all option is not passed, only the first parent in the collection will be used.

  - Example: `$('div').cloneTo('.target')` // Clones and places inside first .target element (default behavior)
  - Example: `$('div').cloneTo('.target', { position: 'after' })` // Clones and places after first .target element
  - Example: `$('div').cloneTo('.target', { all: true })` // Clones and places inside all .target elements
  - Example: `$('div').cloneTo('.target', { all: true, position: 'before' })` // Clones and places before all .target elements

##### DomProxy.moveTo

- **moveTo(parentSelector: string, options?: { position: string }): DomProxy**

  - Move the element to a new parent element in the DOM. The original element is moved from its current location. If you want to clone the element instead of moving it, use `cloneTo`.

  - The position can be:

    - 'append' (default): Adds the children to the end of the parent.
    - 'prepend': Adds the children to the beginning of the parent.
    - 'before': Adds the children before the parent.
    - 'after': Adds the children after the parent.

  - The all option can technically be used, but it will only move the element to the last parent in the collection. This is because the element can only exist in one place at a time. Use `cloneTo` if you want to move the element to multiple parents.

  - Example: `$('div').moveTo('.target')` // Moves inside first .target element (default behavior)
  - Example: `$('div').moveTo('.target', { position: 'after' })` // Moves after first .target element

##### DomProxy.replaceWith

- **replaceWith(replacements: Array<HTMLElement>, mode?: "move" | "clone"): DomProxy**

  - Replace the element with a new element. By default, the new element is moved to the replaced element's location. To clone it instead, set the mode to 'clone'.
  - Example: `$('div').replaceWith(newElement)`
  - Example: `$('div').replaceWith(newElement, 'clone')`

##### DomProxy.remove

- **remove(): DomProxy**

  - Removes the element from the DOM entirely.
  - Example: `$('button').remove()`

##### DomProxy.animate

- **animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions): DomProxy**

  - Animates the element using the WAAPI.
  - Example: `$('button').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })`
  - [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)

##### DomProxy.wait

- **wait(ms: number): DomProxy**

  - Waits for a specified number of milliseconds before continuing the chain.
  - Example: `$('button').wait(1000)`

##### DomProxy.do

- **do(fn: (el: DomProxy) => Promise<void>): DomProxy**

  - Executes an asynchronous function and waits for it to resolve before continuing the chain (can be synchronous too).
  - Can receive the element as an argument, and you can still use all the proxy methods inside the function.

  - Example:

  ```javascript
  $("button").do(async (el) => {
    const response = await fetch("https://api.github.com/users/jazzypants1989")
    const data = await response.json()
    el.text(data.name)
  })
  ```

##### DomProxy.parent

- **parent(): DomProxy**

  - Switch to the parent of the element in the middle of a chain.
  - Example: `$('button').css('color', 'red').parent().css('color', 'blue')`
  - Expectation: The parent of the button will turn blue. The button itself will remain red.

##### DomProxy.siblings

- **siblings(): DomProxyCollection**

  - Switch to the siblings of the element in the middle of a chain.
  - Example: `$('button').css('color', 'red').siblings().css('color', 'blue')`
  - Expectation: The siblings of the button will turn blue. The button itself will remain red.

##### DomProxy.children

- **children(): DomProxyCollection**

  - Switch to the children of the element in the middle of a chain.
  - Example: `$('button').css('color', 'red').children().css('color', 'blue')`
  - Expectation: The children of the button will turn blue. The button itself will remain red.

##### DomProxy.pick

- **pick(subSelector: string): DomProxyCollection**

  - Picks descendants matching a sub-selector.
  - Example: `$('.container').css('color', 'red').pick('.buttons').css('color', 'blue')`
  - Expectation: The descendants of the container will turn blue. The container itself will remain red.

##### DomProxy.closest

- **closest(ancestorSelector: string): DomProxy**

  - Gets the closest ancestor matching a selector.
  - Example: `$('.buttons').css('color', 'red').closest('.container').css('color', 'blue')`
  - Expectation: The container will turn blue. The buttons will remain red.

### DomProxyCollection

A proxy covering a collection of HTML elements that allows you to chain methods sequentially (including asynchronous tasks) and then execute them all at once.

#### DomProxyCollection Methods

##### DomProxyCollection.on

- **on(ev: string, fn: EventListenerOrEventListenerObject): DomProxyCollection**

  - Adds an event listener to the elements.
  - Example: `$$('button').on('click', () => console.log('clicked'))`

##### DomProxyCollection.once

- **once(ev: string, fn: EventListenerOrEventListenerObject): DomProxyCollection**

  - Adds an event listener to the elements that will only fire once.
  - Example: `$$('button').once('click', () => console.log('clicked'))`

##### DomProxyCollection.off

- **off(ev: string, fn: EventListenerOrEventListenerObject): DomProxyCollection**

  - Removes an event listener from the elements.
  - Example: `$$('button').off('click', () => console.log('clicked'))`

##### DomProxyCollection.delegate

- **delegate(event: string, subSelector: string, handler: EventListenerOrEventListenerObject): DomProxyCollection**

  - Delegates an event listener to the elements.
  - Example: `$$('.container').delegate('click', '.buttons', (e) => console.log('Button clicked'))`

##### DomProxyCollection.html

- **html(newHtml: string): DomProxyCollection**

  - Change the HTML of the elements with an **UNSANITIZED** string of new HTML. This is useful if you want to add a script tag or something. If you want to sanitize the HTML, use `sanitize` instead.
  - Example: `$$('button').html('<span>Click me!</span>')`

##### DomProxyCollection.sanitize

- **sanitize: (html: string, sanitizer?: (html: string) => string) => DomProxyCollection**

  - Sanitizes a string of untusted HTML, then replaces the elements with the new, freshly sanitized HTML. This helps protect you from XSS Attacks. It uses the setHTML API under the hood, so you can provide your own sanitizer if you want with a second argument.
  - Example: `$$('button').sanitize('<span>Click me!</span>')`
  - MDN Documentation: [setHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML)

##### DomProxyCollection.text

- **text(newText: string): DomProxyCollection**

  - Changes the text of the elements while retaining the tag.
  - Example: `$$('.buttons').text('Click me!')`

##### DomProxyCollection.val

- **val(newValue: string | number | (string | number)[] | FileList): DomProxyCollection**

  - Changes the value of all elements in the collection based on their type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
  - Example: `$$('input[type="text"]').val('New Value')`
  - Example: `$$('input[type="checkbox"]').val(true)`
  - Example: `$$('input[type="radio"]').val('radio1')`
  - Example: `$$('input[type="file"]').val(myFileList)`
  - Example: `$$('select[multiple]').val(['option1', 'option2'])`

##### DomProxyCollection.css

- **css(prop: string | Record<string, string>, value?: string): DomProxyCollection**

  - Adds one or more CSS Rules to the elements. If the first argument is an object, each key-value pair will be added as a CSS Rule. If the first argument is a string, it will be treated as a CSS property and the second argument will be treated as its value.
  - Example: `$$('button').css('color', 'red')`
  - Example: `$$('button').css({ color: 'red', backgroundColor: 'blue' })`

##### DomProxyCollection.addStyleSheet

- **addStyleSheet(cssString: string): DomProxyCollection**

  - Adds a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got an good idea for how to make this scoped to a single element? Open a PR!
  - Example: `$$('button').addStyleSheet('button:hover { color: red }')`

##### DomProxyCollection.addClass

- **addClass(className: string): DomProxyCollection**

  - Adds a class to the elements.
  - Example: `$$('.buttons').addClass('btn')`

##### DomProxyCollection.removeClass

- **removeClass(className: string): DomProxyCollection**

  - Removes a class from the elements.
  - Example: `$$('.buttons').removeClass('btn')`

##### DomProxyCollection.toggleClass

- **toggleClass(className: string): DomProxyCollection**

  - Toggles a class on the elements.
  - Example: `$$('.buttons').toggleClass('btn')`

##### DomProxyCollection.set

- **set(attr: string, value: string?): DomProxyCollection**

  - Sets an attribute on the elements. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
  - Example: `$$('button').set('disabled')`

##### DomProxyCollection.unset

- **unset(attr: string): DomProxyCollection**

  - Removes an attribute from the elements.
  - Example: `$$('button').unset('disabled')`

##### DomProxyCollection.toggle

- **toggle(attr: string): DomProxyCollection**

  - Toggles an attribute on the elements.
  - Example: `$$('button').toggle('disabled')`

##### DomProxyCollection.data

- **data(key: string, value?: string): DomProxyCollection**

  - Sets a data attribute on the elements.
  - Example: `$$('button').data('id', '123')`

##### DomProxyCollection.attach

- **attach(...children: (HTMLElement | DomProxy)[]): DomProxyCollection**

  - Attaches children to the elements based on the provided options.
  - The children can be:
    - A string of HTML
    - A CSS selector
    - An HTMLElement
    - A DomProxy
    - An array of any of the above
  - The position can be:
    - 'append' (default): Adds the children to the end of the elements.
    - 'prepend': Adds the children to the beginning of the elements.
    - 'before': Adds the children before the elements.
    - 'after': Adds the children after the elements.
  - The HTML is sanitized by default, which helps prevent XSS attacks.
  - If you want to disable sanitization, set the `sanitize` option to `false`.
  - Example: `$$('button').attach('<span>Click me!</span>')`
  - Example: `$$('button').attach($('.container'), { position: 'prepend' })`
  - Example: `$$('button').attach([$('.container'), '<span>Click me!</span>'], { position: 'before' })`
  - Example: `$$('button').attach('<image src="x" onerror="alert(\'hacked!\')">')` // No XSS attack here!
  - Example: `$$('button').attach('<image src="x" onerror="alert(\'hacked!\')">', { sanitize: false })` // XSS attack here!
  - [Handy StackOverflow Answer for Position Option](https://stackoverflow.com/questions/14846506/append-prepend-after-and-before)

##### DomProxyCollection.cloneTo

- **cloneTo(parentSelector: string, options?: { position: string; all: boolean }): DomProxyCollection**

  - Clone of the elements to a new parent element in the DOM. The original elements remain in their current location. If you want to move the elements instead of cloning them, use `moveTo`.

  - The position can be:

    - 'append' (default): Adds the children to the end of the parent.
    - 'prepend': Adds the children to the beginning of the parent.
    - 'before': Adds the children before the parent.
    - 'after': Adds the children after the parent.

  - The all option will clone the elements into each new parent in the collection. If the all option is not passed, only the first parent in the collection will be used.

  - Example: `$$('div').cloneTo('.target')` // Clones and places inside first .target element (default behavior)
  - Example: `$$('div').cloneTo('.target', { position: 'after' })` // Clones and places after first .target element
  - Example: `$$('div').cloneTo('.target', { all: true })` // Clones and places inside all .target elements
  - Example: `$$('div').cloneTo('.target', { all: true, position: 'before' })` // Clones and places before all .target elements

##### DomProxyCollection.moveTo

- **moveTo(parentSelector: string, options?: { position: string }): DomProxyCollection**

  - Move the elements to a new parent element in the DOM. The original elements are moved from their current location. If you want to clone the elements instead of moving them, use `cloneTo`.
  - The position can be:
    - 'append' (default): Adds the children to the end of the parent.
    - 'prepend': Adds the children to the beginning of the parent.
    - 'before': Adds the children before the parent.
    - 'after': Adds the children after the parent.
  - The all option can technically be passed, but the elements will simply be attached to the last parent in the collection as there is only one element.
  - Example: `$$('div').moveTo('.target')` // Moves elements inside first .target element (default behavior)
  - Example: `$$('div').moveTo('.target', { position: 'before' })` // Moves elements before first .target element
  - Example: `$$('div').moveTo('.target', { position: 'after' })` // Moves elements after first .target element

##### DomProxyCollection.replaceWith

- **replaceWith(replacements: Array<HTMLElement>, mode?: "move" | "clone"): DomProxyCollection**

  - Replace the elements with new elements. By default, the new elements are moved from their old location. To clone them instead, set the mode to 'clone'.
  - Example: `$$('div').replaceWith([newElement])`
  - Example: `$$('div').replaceWith([newElement], 'clone')`

##### DomProxyCollection.remove

- **remove(): DomProxyCollection**

  - Removes the elements from the DOM.
  - Example: `$$('.buttons').remove()`

##### DomProxyCollection.animate

- **animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions): DomProxyCollection**

  - Animates the elements using the WAAPI.
  - Example: `$$('.buttons').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })`
  - [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)

##### DomProxyCollection.wait

- **wait(ms: number): DomProxyCollection**

  - Waits for a specified number of milliseconds before continuing the chain.
  - Example: `$$('button').wait(1000)`

##### DomProxyCollection.do

- **do(fn: (el: DomProxy) => Promise<void>): DomProxyCollection**

  - Executes an asynchronous function and waits for it to resolve before continuing the chain (can be synchronous too).
  - Example: `$$('button').do(async (el) => { // The elements are passed as an argument
  const response = await fetch('/api')
  const data = await response.json()
  el.text(data.message) // All the methods are still available
})`

##### DomProxyCollection.parent

- **parent(): DomProxyCollection**

  - Switch to the parents of the elements in the middle of a chain.
  - Example: `$$('button').css('color', 'red').parent().css('color', 'blue')`
  - Expectation: The parents of the buttons will turn blue. The buttons themselves will remain red.

##### DomProxyCollection.siblings

- **siblings(): DomProxyCollection**

  - Switch to the siblings of the elements in the middle of a chain.
  - Example: `$$('button').css('color', 'red').siblings().css('color', 'blue')`
  - Expectation: The siblings of the buttons will turn blue. The buttons themselves will remain red.

##### DomProxyCollection.children

- **children(): DomProxyCollection**

  - Switch to the children of the elements in the middle of a chain.
  - Example: `$$('.container').css('color', 'red').children().css('color', 'blue')`
  - Expectation: The children of the container will turn blue. The container itself will remain red.

##### DomProxyCollection.pick

- **pick(subSelector: string): DomProxyCollection**

  - Picks descendants matching a sub-selector.
  - Example: `$$('.container').css('color', 'red').pick('.buttons').css('color', 'blue')`
  - Expectation: The buttons will turn blue. The container will remain red.

##### DomProxyCollection.closest

- **closest(ancestorSelector: string): DomProxyCollection**

  - Gets the closest ancestors for each element in the collection matching a selector.
  - Example: `$$('.buttons').css('color', 'red').closest('.container').css('color', 'blue')`
  - Expectation: The containers will turn blue. The buttons will remain red.

### setErrorHandler

Sets an error handler that will be called when an error occurs somewhere in JessQuery. The default behavior is to just log it to the console. You can override this behavior with this method to do something else (or nothing... no judgement here! 😉)

- **handler: (err: Error) => void**

  - The error handler

- Example:

  ```javascript
  setErrorHandler((err) => alert(err.message))
  // Now, you'll get an annoying alert every time an error occurs like a good little developer
  ```

### promisify

Converts any function that uses callbacks into a function that returns a promise, allowing easy integration into DomProxy chains. This is particularly useful for things like setTimeout, setInterval, and any older APIs that use callbacks.

This works just like building a normal promise: call the resolve function when the function is successful, and call the reject function when it fails. If the function does not call either resolve or reject within the specified timeout, the promise will automatically reject. If you call the resolve function, the promise will resolve with the value you pass into it. If you call the reject function, the promise will reject with the value you pass into it.

Every promise that rejects or error found inside of a promisified function will get routed through the default error handler (which you can set with the setErrorHandler function).

To use this function in the middle of a chain:

- You can use it to provide values to one of the DomProxy methods like text() or html().

OR

- You can use the DomProxy.do method to execute the function and use the result on the element or elements represented by the DomProxy or DomProxyCollection.

- **fn: (...args: any[]) => void**

  - The function to promisify

- **timeout?: number**

  - The number of milliseconds to wait before automatically rejecting the promise. If this is not provided, the promise will never automatically reject.

- Example:

  ```javascript
  const fetchApiData = promisify((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1")
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })

  setErrorHandler((err) => $("#display").text(err.message))

  button.on("click", () => {
    display
      .text("Hold on! I'm about to use XHR")
      .wait(500)
      .do(async (el) => {
        const data = await fetchApiData()
        el.text(data)
      })
  })

  // Or remember, you can just pass it into the text method!
  button.on("click", async () => {
    display
      .text("I betcha don't even know what XHR is!")
      .wait(1000)
      .text(fetchApiData())
  })
  ```

## Contributing

If you have any ideas for new features or improvements, feel free to open an issue or a PR. I'm always open to suggestions! I started this as a bit of a joke, but I think it turned into something pretty useful. I'm sure there are a lot of things that could be improved, so I welcome any and all feedback.
