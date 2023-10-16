declare module "jessquery" {
  /**
   * A proxy covering a single HTML element that allows you to chain methods sequentially (including asynchronous tasks) and then execute them all at once.
   *
   * Methods:
   * - {@link DomProxy.on} - Add an event listener to the element
   * - {@link DomProxy.once} - Add an event listener that will only fire once to the element
   * - {@link DomProxy.off} - Remove an event listener from the element
   * - {@link DomProxy.delegate} - Delegate an event listener to the element
   * - {@link DomProxy.html} - Change the HTML of the element with an **UNSANITIZED** string of new HTML. This is useful if you want to add a script tag or something. If you want to sanitize the HTML, use {@link DomProxy.sanitize} instead.
   * - {@link DomProxy.sanitize} - Sanitizes a string of untrusted HTML using the setHTML API, and sets the sanitized HTML to the provided element. Offers protection against XSS attacks.
   * - {@link DomProxy.text} - Change the text of the element while retaining the HTML.
   * - {@link DomProxy.val} - Sets the value of a DOM element based on its type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
   * - {@link DomProxy.css} - Add a CSS Rule to the element. If the first argument is an object, it will be treated as a map of CSS properties and values. Otherwise, it will be treated as a single CSS property and the second argument will be treated as the value.
   * - {@link DomProxy.addStylesheet} - Add a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got a good idea for how to make this scoped to a single element? Open a PR!
   * - {@link DomProxy.addClass} - Add a class to the element
   * - {@link DomProxy.removeClass} - Remove a class from the element
   * - {@link DomProxy.toggleClass} - Toggle a class on the element
   * - {@link DomProxy.set} - Set an attribute on the element. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
   * - {@link DomProxy.unset} - Remove an attribute from the element
   * - {@link DomProxy.toggle} - Toggle an attribute on the element
   * - {@link DomProxy.data} - Set a data attribute on the element.
   * - {@link DomProxy.attach} - Attaches children to the element based on the provided options.
   * - {@link DomProxy.cloneTo} - Clone of the element to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original element remains in its current location. If you want to move the element instead of cloning it, use {@link DomProxy.moveTo}.
   * - {@link DomProxy.moveTo} - Move the element to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original element is removed from its current location. If you want to clone the element instead of moving it, use {@link DomProxy.cloneTo}.
   * - {@link DomProxy.become} - Replace the element with a new element. By default, the new element is permanentaly removed from its original location. To clone it instead, set the mode to 'clone'.
   * - {@link DomProxy.purge} - Remove the element from the DOM entirely
   * - {@link DomProxy.fromJSON} - Fetches a JSON resource from the provided URL, applies a transformation function on it and the proxy's target element.
   * - {@link DomProxy.fromHTML} - Fetches an HTML resource from the provided URL and inserts it into the proxy's target element.
   * - {@link DomProxy.do} - Executes an asynchronous function and waits for it to resolve before continuing the chain (can be synchronous too)
   * - {@link DomProxy.defer} - Schedules a function for deferred execution on the element. This will push the operation to the very end of the internal event loop.
   * - {@link DomProxy.transition} - Animate the element using the WAAPI. The queue will wait for the animation to complete before continuing.
   * - {@link DomProxy.wait} - Sets a timeout for the given number of milliseconds and waits for it to resolve before continuing the chain
   * - {@link DomProxy.next} - Switch to the nextElementSibling in the middle of a chain
   * - {@link DomProxy.prev} - Switch to the previousElementSibling in the middle of a chain
   * - {@link DomProxy.first} - Switch to the firstChild of the element in the middle of a chain
   * - {@link DomProxy.last} - Switch to the lastChild of the element in the middle of a chain
   * - {@link DomProxy.parent} - Switch to the parentElement in the middle of a chain
   * - {@link DomProxy.ancestor} - Switch to the closest ancestor matching a selector in the middle of a chain
   * - {@link DomProxy.pick} - Switch to the first descendant matching a selector in the middle of a chain
   * - {@link DomProxy.pickAll} - Switch to a collection of all the descendants that match a selector in the middle of a chain
   * - {@link DomProxy.kids} - Switch to a collection of all the children of the element in the middle of a chain
   * - {@link DomProxy.siblings} - Switch to a collection of all the siblings of the element in the middle of a chain
   */
  export type DomProxy<T extends HTMLElement = HTMLElement> = T & {
    /** Add an event listener to the element.
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxy}
     * @example
     * $('button').on('click', () => console.log('clicked'))
     */
    on: (ev: string, fn: EventListenerOrEventListenerObject) => DomProxy<T>

    /** Add an event listener that will only fire once to the element
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxy}
     * @example
     * $('button').once('click', () => console.log('clicked'))
     * // The event listener will only fire once
     */
    once: (ev: string, fn: EventListenerOrEventListenerObject) => DomProxy<T>

    /** Remove an event listener from the element
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxy}
     * @example
     * $('button').off('click', clickHandler)
     * // The event listener will no longer fire
     */
    off: (ev: string, fn: EventListenerOrEventListenerObject) => DomProxy<T>

    /** Delegate an event listener to the element
     * @param event The event name
     * @param subSelector The sub-selector
     * @param handler The event handler
     * @returns This {@link DomProxy}
     * @example
     * $('.container').delegate('click', '.buttons', (e) => console.log('Button clicked'))
     */
    delegate: (
      event: string,
      subSelector: string,
      handler: EventListenerOrEventListenerObject
    ) => DomProxy<T>

    /** Change the HTML of the element with an **UNSANITIZED** string of new HTML. This is useful if you want to add a script tag or something. If you want to sanitize the HTML, use {@link DomProxy.sanitize} instead.
     * @param newHtml The new HTML
     * @returns This {@link DomProxy}
     * @example
     * $('button').html('<span>Click me!</span>')
     */
    html: (newHtml: string) => DomProxy<T>

    /**
     * Sanitizes a string of untrusted HTML using the setHTML API, and sets the sanitized HTML to the provided element.
     * Offers protection against XSS attacks.
     *
     * @param {string} html - Untrusted HTML string to sanitize and set.
     * @param {Sanitizer} [sanitizer] - An instance of Sanitizer to customize the sanitization. Defaults to a new Sanitizer() with default configuration.
     * @returns {DomProxy} - The provided element with the sanitized content set.
     *
     * @example
     * const maliciousHTML = '<span>Safe Content</span><script>alert("hacked!")</script>';
     * const customSanitizer = new Sanitizer({
     *   allowElements: ['span']
     * });
     * $('button').sanitize(maliciousHTML, customSanitizer);
     * // The button will only contain the 'Safe Content' span;
     * // Any scripts (or other unwanted tags) will be removed.
     * // Only span elements will be allowed.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML}
     */
    sanitize: (html: string, sanitizer?: Sanitizer) => DomProxy<T>

    /** Change the text of the element while retaining the HTML.
     * @param newText The new text
     * @returns This {@link DomProxy}
     * @example
     * $('button').text('Click me!')
     */
    text: (newText: string) => DomProxy<T>

    /**
     * Sets the value of a DOM element based on its type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
     * @param newValue - The value to be set. This can be a string, number, an array for multi-selects, a FileList for file inputs, or a boolean for checkboxes.
     *    - For `input[type="checkbox"]`: A truthy value sets it to checked, otherwise unchecked.
     *    - For `input[type="radio"]`: If the `newValue` matches the input's value, it's checked.
     *    - For `input[type="file"]`: Sets the input's `files` property (expects a FileList or similar).
     *    - For `select[multiple]`: Expects an array of values to select multiple options.
     * @returns This {@link DomProxy}.
     * @example
     * $('input[type="text"]').val('New Val')
     * $('input[type="checkbox"]').val(true)
     * $('input[type="radio"]').val('radio1')
     * $('input[type="file"]').val(myFileList)
     * $('select[multiple]').val(['option1', 'option2'])
     */
    val: (
      newValue: string | number | (string | number)[] | FileList
    ) => DomProxy<T>

    /** Add a CSS Rule to the element. If the first argument is an object, it will be treated as a map of CSS properties and values. Otherwise, it will be treated as a single CSS property and the second argument will be treated as the value.
     * @param propOrObj The CSS property or object containing CSS properties and values
     * @param value The CSS value
     * @returns This {@link DomProxy}
     * @example
     * $('button').css('color', 'red')
     * OR
     * $('button').css({ color: 'red', backgroundColor: 'blue' })
     */
    css: (
      propOrObj: string | { [key: string]: string | number },
      value?: string
    ) => DomProxy<T>

    /** Add a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got a good idea for how to make this scoped to a single element? Open a PR!
     * @param css The CSS to add
     * @returns This {@link DomProxy}
     * @example
     * $('button').stylesheet('button:hover { color: red; }')
     * // Now all buttons on the page will turn red when hovered
     */
    addStylesheet: (css: string) => DomProxy<T>

    /** Add a class to the element
     * @param className The class name
     * @returns This {@link DomProxy}
     * @example
     * $('button').addClass('btn')
     */
    addClass: (className: string) => DomProxy<T>

    /** Remove a class from the element
     * @param className The class name
     * @returns This {@link DomProxy}
     * @example
     * $('button').removeClass('btn')
     */
    removeClass: (className: string) => DomProxy<T>

    /** Toggle a class on the element
     * @param className The class name
     * @returns This {@link DomProxy}
     * @example
     * $('button').toggleClass('btn')
     */
    toggleClass: (className: string) => DomProxy<T>

    /** Set an attribute on the element. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
     * @param attr The attribute name
     * @param value The attribute value (optional)
     * @returns This {@link DomProxy}
     * @example
     * $('button').set('disabled')
     * $('button').set('formaction', '/submit')
     */
    set: (attr: string, value?: string) => DomProxy<T>

    /** Remove an attribute from the element
     * @param attr The attribute name
     * @returns This {@link DomProxy}
     * @example
     * $('button').unset('disabled')
     */
    unset: (attr: string) => DomProxy<T>

    /** Toggle an attribute on the element
     * @param attr The attribute name
     * @returns This {@link DomProxy}
     * @example
     * $('button').toggle('disabled')
     */
    toggle: (attr: string) => DomProxy<T>

    /**
     * Set a data attribute on the element.
     * @param key The dataset key
     * @param value The corresponding value for the dataset key
     * @returns This {@link DomProxy}
     * @example
     * $('div').data('info', 'extraDetails')
     * This implies: element.dataset.info = 'extraDetails'
     */
    data: (key: string, value: string) => DomProxy<T>

    /**
     * Attaches children to the element based on the provided options.
     * The children can be:
     * - A string of HTML
     * - A CSS selector
     * - An HTMLElement
     * - A DomProxy
     * - An array of any of the above
     *
     * The position can be:
     * - 'append' (default): Adds the children to the end of the element.
     * - 'prepend': Adds the children to the beginning of the element.
     * - 'before': Adds the children before the element.
     * - 'after': Adds the children after the element.
     *
     * The HTML is sanitized by default, which helps prevent XSS attacks.
     * If you want to disable sanitization, set the `sanitize` option to `false`.
     *
     * @param {...*} children - The children to attach. The last argument can be an options object.
     * @param {Object} [options] - The options object.
     * @param {('append'|'prepend'|'before'|'after')} [options.position='append'] - Where to attach the children.
     * @param {boolean} [options.sanitize=true] - Whether or not to sanitize the HTML.
     * @returns This {@link DomProxy}
     *
     * @example
     * $('button').attach('<span>Click me!</span>');
     * $('button').attach($('.container'), { position: 'prepend' });
     * $('button').attach([$('.container'), '<span>Click me!</span>'], { position: 'before' });
     * $('button').attach('<image src="x" onerror="alert(\'hacked!\')">'); // No XSS attack here!
     * $('button').attach('<image src="x" onerror="alert(\'hacked!\')">', { sanitize: false }); // XSS attack here!
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    attach: (...children: ChildInput[]) => DomProxy<T>

    /**
     * Clone of the element to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original element remains in its current location. If you want to move the element instead of cloning it, use `moveTo`.
     * @param parentSelector CSS selector for the parent element to which the cloned element will be added.
     * @param options Optional configuration for the function behavior.
     * @param {boolean} [options.all=false] If set to true, the element will be cloned or moved to all elements matching the parentSelector.
     * @param {"before" | "after" | "prepend" | "append"} [options.position="append"] If not selected, the element will be placed inside the parent element after any existing children. If you want it right outside of the parent element, use 'before' or 'after'. If you want it to be the first child, use 'prepend'.
     * @returns This {@link DomProxy}
     * @example
     * $('button').cloneTo('.target') // Clones and appends to .target (default behavior)
     * $('button').cloneTo('.target', { position: 'prepend' }) // Clones and prepends to .target as first child
     * $('button').cloneTo('.target', { all: true }) // Clones and appends to all .target elements
     * $('button').cloneTo('.target', { all: true, position: 'before' }) // Clones and adds element just before all .target elements
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    cloneTo: (
      parentSelector: string,
      options?: MoveOrCloneOptions
    ) => DomProxy<T>

    /**
     * Move the element to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original element is removed from its current location. The `all` option is technically available, but it will simply use the last element in the collection. This is because you can only move an element to one place at a time. If you want to clone the element instead of moving it, use `cloneTo`.
     * @param parentSelector CSS selector for the parent element to which the element will be moved.
     * @param options Optional configuration for the function behavior.
     * @param {"before" | "after" | "prepend" | "append"} [options.position="append"] If not selected, the element will be placed inside the parent element after any existing children. If you want it right outside of the parent element, use 'before' or 'after'. If you want it to be the first child, use 'prepend'.
     * @returns This {@link DomProxy}
     * @example
     * $('button').moveTo('.target') // Moves and appends to .target (default behavior)
     * $('button').moveTo('.target', { position: 'prepend' }) // Moves and prepends to .target as first child
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    moveTo: (
      parentSelector: string,
      options?: MoveOrCloneOptions
    ) => DomProxy<T>

    /**
     * The become method is used to replace a single element with a different element from elsewhere in the DOM.
     *
     * Under the hood, it utilizes the native `replaceWith` method but adds extra layers of functionality. The replacement can be a simple HTMLElement, an array of HTMLElements, or another DomProxy instance.
     *
     * - **Mode**:
     *
     * - *clone* (default) - This makes a copy of the replacement element to use for the DomProxy. This clone includes the element, its attributes, and all its child nodes, but does not include event listeners. The original element is left untouched.
     *
     * - *move* - This moves the replacement element to the original element's position. The original element is removed from the DOM. This is the same as calling `replaceWith` directly.
     *
     * - **Match**: The `options.match` parameter mainly influences behavior when used with $$, but its default value is 'cycle'. For a single `$` operation, this is mostly irrelevant.
     *
     * @param {HTMLElement|Array<HTMLElement>|DomProxy} replacements - Element(s) or DomProxy that will replace the current element.
     * @param {Object} [options] - Replacement options.
     * @param {"move"|"clone"} [options.mode="clone"] - Decides if the new element replaces the existing element as-is ('move') or as a deep clone ('clone').
     * @param {"cycle"|"remove"} [options.match="cycle"] - Determines how multiple replacements are handled. Mostly relevant for $$ operations.
     * @returns {DomProxy} - A DomProxy instance that wraps the new element(s), enabling chainable methods.
     *
     * @example
     * // Replaces div with newElement, literally moving it to the original div's position.
     * $('div').become(newElement, {mode: "move"})
     *
     * @example
     * // Replaces div with a deep clone of newElement, leaving the original newElement untouched.
     * $('div').become(newElement, {mode: "clone"})
     *
     * @example
     * // Takes another DomProxy as the replacement. The first element of the DomProxy is chosen for the replacement.
     * $('#button').become($$('.otherButtons'))
     *
     * @example
     * // Replaces the div with newElement. If newElement is null, the div is removed due to the 'remove' match setting.
     * $('div').become(newElement || null, {mode: "move", match: "remove"})
     */
    become: (
      replacements: HTMLElement | Array<HTMLElement> | DomProxy,
      options?: { mode?: "move" | "clone"; match?: "cycle" | "remove" }
    ) => DomProxy<T>

    /** Remove the element from the DOM entirely. This is a light wrapper around `remove`.
     * @returns This {@link DomProxy}
     * @example
     * $('button').purge()
     */
    purge: () => DomProxy<T>

    /**
     * Sends an HTTP request using the current element as the body of the request unless otherwise specified.
     *
     * None of the options are required-- not even the URL.
     *
     * If you do not provide a URL the method will:
     * - First, look to see if it's in a form with an action property.
     * - Next, it will look to see if the element is a button with a formaction property.
     * - Next, it will try to see if the element is part of a form that has an action property.
     * - Finally, it will take the current URL and slice off everything after the last slash. (http://example.com/foo/index.html -> http://example.com/foo/)
     *
     * Unless the `body` option is provided, it will be created automatically based on the element type:
     * - If it's a form, the entire form will be serialized using the formData API unless a custom serializer is provided.
     * - If it's an input, textarea, or select, the value will be used.
     * - If it isn't a form or one of the above elements, we will check to see if the element has a form property or one can be found with the `closest` method. If so, we will serialize the form using the formData API unless a custom serializer is provided.
     * - If none of the above, the element's textContent will be used.
     *
     * If the `json` option is set to true, the request will be sent as JSON and the response will be parsed as JSON.
     *
     * Otherwise, the request will be sent as FormData and the response will be parsed as text.
     *
     * @param {Element} element - The DOM element to gather data from and determine type of the request.
     * @param {object} options - Configuration for the AJAX request.
     * @param {string} [options.url] - Endpoint for the request. Defaults to element’s action/formAction.
     * @param {string} [options.method="POST"] - HTTP method for the request.
     * @param {boolean} [options.json=false] - If true, sends and expects JSON, otherwise sends FormData.
     * @param {any} [options.body] - Body of the request. Defaults to form/input field content.
     * @param {Event} [options.event] - Event object to prevent default behavior.
     * @param {function} [options.serializer] - Custom function to serialize form data.
     * @param {string} [options.error] - Error message for display/update on failed request.
     * @param {string} [options.fallback] - Message/content to display during request processing.
     * @param {function} [options.onError] - Callback for request errors.
     * @param {function} [options.onSuccess] - Callback for all requests, triggered finally.
     *
     * @returns {DomProxyCollection} - The matched elements with the updated content.
     *
     * @example
     * // Send a JSON request using input value, providing fallback and completion messages.
     * $('#myInput').send(myElement, {
     *   url: '/api/data',
     *   json: true,
     *   fallback: 'Loading...',
     *   onSuccess: (data) => console.log('Received:', data),
     *   onError: (error) => console.log('Error occurred:', error),
     * });
     *
     * @example
     * // Send form data using a custom serializer.
     * $('#myForm').send(myElement, {
     *    url: '/api/data',
     *    serializer: (form) => {
     *    const formData = new FormData(form);
     *    formData.append('extra', 'data');
     *    return formData;
     *  },
     * });
     */
    send: (
      options: {
        url?: string
        json?: boolean
        event?: Event
        serializer?: () => void
      } & FetchOptions
    ) => DomProxy<T>

    /**
     * Fetches a JSON resource from the provided URL and applies a transformation function which uses the fetched JSON and the proxy's target element as arguments.
     * @param {string} url - The URL to fetch the JSON from.
     * @param {function} transformFunc - The function that applies transformations on the fetched JSON and the proxy's target element.
     * @param {FetchOptions} [options={}] - Options for the fetch operation.
     * @param {string} [options.error] - A message to display if the fetch fails.
     * @param {string} [options.fallback] - A message to display while the fetch is in progress.
     * @param {function} [options.onSuccess] - A callback to execute when the fetch is complete.
     *
     * @returns This {@link DomProxy}
     * @example
     * $('#item').fromJSON('/api/data', (element, json) => {
     *     element.text(json.value);
     * });
     * @example
     * $('#item').fromJSON('/api/data', (element, json) => {
     *    element.html(`<span>${json.description}</span>`);
     * });
     * @example
     * $('#news-item').fromJSON('/api/news-item', (element, json) => {
     *    const { title, summary } = json;
     *
     *   element.html(`<h1>${title}</h1>
     *                 <p>${summary}</p>`);
     * },
     * {
     *   error: 'Failed to load news item',
     *   fallback: 'Loading news item...'
     *   onSuccess: () => console.log('News item loaded')
     */
    fromJSON: (
      url: string,
      transformFunc: (el: DomProxy<T>, json: any) => void,
      options?: FetchOptions
    ) => DomProxy<T>

    /**
     * Fetches an HTML resource from the provided URL and inserts it into the proxy's target element.
     * @param {string} url - The URL to fetch the HTML from.
     * @param {FetchOptions} [options={}] - Options for the fetch operation.
     * @param {string} [options.error] - A message to display if the fetch fails.
     * @param {string} [options.fallback] - A message to display while the fetch is in progress.
     * @param {boolean} [options.sanitize=true] - Determines if the fetched HTML should be sanitized before insertion. Defaults to true.
     * @param {function} [options.sanitizer] - A custom sanitizer to use for sanitization. {@link https://developer.mozilla.org/en-US/docs/Web/API/Sanitizer/Sanitizer}
     *
     * @returns This {@link DomProxy}
     * @example
     * $('#template').fromHTML('/template.html');
     * @example
     * $('#update').fromHTML('/update.html', { fallback: 'Loading update...', error: 'Failed to load update!' });
     * @example
     * $('#content').fromHTML('/malicious-content.html', { sanitize: false });
     */
    fromHTML: (url: string, options?: FetchOptions) => DomProxy<T>

    /**
     * Dynamically fetches data from the provided URL and updates a single DOM element using a stream or Server-Sent Event (SSE).
     *
     * @param {string} url - The source URL to retrieve data from.
     * @param {object} [options={}] - Configurations for the stream operation.
     * @param {boolean} [options.sse=false] - If set to true, fetches data using SSE. Otherwise, uses a generic data stream.
     * @param {boolean} [options.add=false] - For SSE, if set to true, appends new data to existing content. Otherwise, it replaces the content.
     * @param {string} [options.error="An error occurred."] - The message displayed if the stream encounters an error.
     * @param {string} [options.fallback="Loading..."] - The message displayed while the stream is connecting or data is loading.
     * @param {boolean} [options.sanitize=true] - If set to true, sanitizes incoming HTML content before injecting it into the DOM to prevent potential XSS attacks.
     * @param {function} [options.onSuccess] - Callback invoked upon stream completion or after each SSE message is received. Receives the last data chunk or SSE event as an argument.
     *
     * @returns {DomProxy} - Returns the instance of DomProxy for chaining.
     *
     * @example
     * // Streaming generic data into a single element.
     * $('#content').fromStream('/api/data');
     *
     * // Streaming with SSE and appending data to existing content.
     * $('#liveFeed').fromStream('/api/live', {
     *   sse: true,
     *   add: true,
     *   onSuccess: (data) => console.log('New data received:', data)
     * });
     */
    fromStream: (
      url: string,
      options?: {
        sse?: boolean
        add?: boolean
        error?: string
        fallback?: string
        sanitize?: boolean
        onSuccess?: (data: any) => void
      }
    ) => DomProxy<T>

    /** Executes an asynchronous function and waits for it to resolve before continuing the chain (can be synchronous too)
     * @param fn The async callback. This can receive the element as an argument.
     * @returns This {@link DomProxy}
     * @example
     * $('button')
     * .css('color', 'red')
     * .do(async (el) => { // The element is passed as an argument
     *    const response = await fetch('/api')
     *    const data = await response.json()
     *    el.text(data.message) // All the methods are still available
     * })
     * .css('color', 'blue')
     */
    do: (fn: (el: DomProxy<T>) => Promise<void>) => DomProxy<T>

    /**
     * Schedules a function for deferred execution on the element. This will push the operation to the very end of the internal event loop.
     *
     * Usually, everything will happen in sequence anyways. Given the predictability of each queue, `defer` has limited use cases and should be used sparingly. The whole point of JessQuery is to make things predictable, so you should just put the function at the end of the chain if you can.
     *
     * The only problem is if you set up an event listener using the same variable that has lots of queued behavior-- especially calls to the `wait` method. Just wrap the `wait` call and everything after it in `defer` to ensure that event handlers don't get stuck behind these in the queue.
     *
     * This captures the collection's state at the time of the call, so it should not be mixed with context-sensitive methods like `next`, `prev`, `first`, `last`, `parent`, `ancestor`, `pick`, `pickAll`, `kids`, or `siblings`.
     *
     * Honestly, I'm not sure if this even makes much sense. I just spent a bunch of time building a crazy queue system, and I feel like I need to expose it. If you have any ideas for how to make this more useful, please open an issue or PR.
     *
     * @param {function(DomProxy): void} fn - The function to be deferred for later execution. It will be passed the DomProxy instance as an argument.
     * @returns {DomProxy} - The DomProxy instance, allowing for method chaining.
     *
     * @example
     * button
     *     .on('click', () => {
     *        button.text('Clicked!'); // This will be delayed for the first second
     *    })
     *     .wait(1000)
     *     .text('Click me!')
     *
     * button
     *    .on('click', () => {
     *       button.text('Clicked!'); // This will happen immediately
     *   })
     *   .defer((el) => el.wait(1000).text('Click me!'))
     *
     * // Take note that this is only an issue if you're using the same variable for both the event handler and the queued behavior.
     * button
     *   .on('click', () => {
     *     $('button').text('Clicked!'); // No problem here. This gets its own queue.
     *  })
     *   .wait(1000)
     *
     * @example
     * // Please limit the use of this method anywhere other than the end of a chain. That's confusing.
     * // Only use it for race conditions or other edge cases.
     * display
     *    .defer((el) => el.css("color", "blue"))
     *    .text("HALF A SECOND OF GLORY") // Text is black
     *    .wait(500).text("Hello, world!") // Text is red
     *    .css("color", "red"))
     *    .wait(500).text("Goodbye, world!") // Text is blue
     * // This is missing the point of JessQuery. Just put each method in sequence.
     */
    defer: (fn: (element: DomProxy) => void) => DomProxy

    /** Animate the element using the WAAPI. The queue will wait for the animation to complete before continuing.
     *
     *  - Returns the proxy so that you can continue chaining methods. If you need to return the animation object, just use the `animate` method directly.
     *  - Remember, this method is blocking, so watch out for any event handlers using the same variable.
     *
     * **Keyframes**:
     *
     * The keyframes can be specified in a few different ways:
     *
     * - *Array* - An array of objects (keyframes) consisting of properties and values to iterate over. This is the canonical format returned by the `getKeyframes()` method. Each keyframe is an object containing the CSS properties and values to animate. The first keyframe is the "from" keyframe, and the last keyframe is the "to" keyframe. The number of keyframes is arbitrary.
     *
     * Example:
     *
     * ```js
     * $('button').animate([
     *  { opacity: 0, color: '#fff' },
     * { opacity: 1, color: '#000' }
     * ], 2000)
     * ```
     * - *Object* - An object containing the CSS properties and values to animate. The keys are the CSS properties, and the values are the CSS values. The object is treated as a single keyframe. The key is the property to animate, and the value is an array of values to iterate over. The number of elements in each array does not need to be equal. The provided values will be spaced out independently.
     *
     * Example:
     *
     * ```js
     * $('button').animate({
     * opacity: [0, 1], // [ from, to ]
     * color: ['#fff', '#000'] // [ from, to ]
     * }, 2000)
     * ```
     * **Options**:
     *
     * Either an integer representing the animation's duration (in milliseconds), or an Object containing one or more timing properties described in the `KeyframeEffect()` options parameter and/or the following options:
     *
     * - *Number* - The duration of the animation in milliseconds.
     * - *Object* - An object containing the animation options. The options are the same as the options for the `KeyframeEffect` constructor.
     *
     *    - *id* - A string with which to reference the animation.
     *    - *rangeStart* - Specifies the start of an animation's attachment range along its timeline, i.e. where along the timeline an animation will start. The JavaScript equivalent of the CSS `animation-range-start` property. `rangeStart` can take the same value types as `rangeEnd`.
     *    - *rangeEnd* - Specifies the end of an animation's attachment range along its timeline, i.e. where along the timeline an animation will end. The JavaScript equivalent of the CSS `animation-range-end` property.
     *    - *timeline* - The `AnimationTimeline` to associate with the animation. Defaults to `Document.timeline`. The JavaScript equivalent of the CSS `animation-timeline` property.
     *
     * @param keyframes The keyframes to animate
     * @param options The animation options
     * @returns This {@link DomProxy}
     * @example
     * $('button').transition([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
     */
    transition: (
      keyframes: Keyframe[] | PropertyIndexedKeyframes,
      options: KeyframeAnimationOptions
    ) => DomProxy<T>

    /** Sets a timeout for the given number of milliseconds and waits for it to resolve before continuing the chain
     * @param ms The number of milliseconds to wait
     * @returns This {@link DomProxy}
     * @example
     * $('button').css('color', 'red').wait(1000).css('color', 'blue')
     */
    wait: (ms: number) => DomProxy<T>

    /** Switch to the nextElementSibling in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxy} from the next element
     * @example
     * $('button')
     * .css('color', 'red')
     * .next()
     * .css('color', 'blue')
     * // the next button will turn blue
     * // the original button will remain red
     */
    next: () => DomProxy<T>

    /** Switch to the previousElementSibling in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxy} from the previous element
     * @example
     * $('button')
     * .css('color', 'red')
     * .prev()
     * .css('color', 'blue')
     * // the previous button will turn blue
     * // the original button will remain red
     */
    prev: () => DomProxy<T>

    /** Switch to the firstChild of the element in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxy} from the firstChild element
     * @example
     * $('container')
     * .css('color', 'red')
     * .first()
     * .css('color', 'blue')
     */
    first: () => DomProxy<T>

    /** Switch to the lastChild of the element in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxy} from the lastChild element
     * @example
     * $('container')
     * .css('color', 'red')
     * .lastChild()
     * .css('color', 'blue')
     */
    last: () => DomProxy<T>

    /** Switch to the parentElement in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxy} from the parent element
     * @example
     * $('button')
     * .css('color', 'red')
     * .parent()
     * .css('color', 'blue')
     * // the parent of the button will turn blue
     * // the button itself will remain red
     */
    parent: () => DomProxy<T>

    /** Switch to the closest ancestor matching a selector in the middle of a chain. Uses the native `closest` method.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param ancestorSelector The ancestor selector
     * @returns A new {@link DomProxy} from the ancestor element
     * @example
     * $('.buttons').ancestor('.container')
     */
    ancestor: (ancestorSelector: string) => DomProxy<T>

    /** Switch to the first descendant matching a selector in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param subSelector The sub-selector
     * @returns A new {@link DomProxy} created from the first element matching the sub-selector
     * @example
     * $('.container').pick('.buttons')
     * // Switches to the first element with the class 'buttons' inside the container
     */
    pick: (subSelector: string) => DomProxy<T>

    /** Switch to a collection of all of the descendants of the element that match a selector in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param subSelector The sub-selector
     * @returns A new {@link DomProxyCollection} created from the descendants matching the sub-selector
     * @example
     * $('.container').pick('.buttons')
     */
    pickAll: (subSelector: string) => DomProxyCollection<T>

    /** Switch to the children of the element in the middle of a chain
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxyCollection} created from the children of the element
     * @example
     * $('.container')
     * .css('color', 'red')
     * .kids()
     * .css('color', 'blue')
     * // All the children of the container will turn blue
     * // The container itself will remain red
     */
    kids: () => DomProxyCollection<T>

    /** Switch to the siblings of the element in the middle of a chain
     *
     *This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns A new {@link DomProxyCollection} created from the siblings of the element
     * @example
     * $('button')
     * .css('color', 'red')
     * .siblings()
     * .css('color', 'blue')
     * // All the siblings of the button will turn blue
     * // The button itself will remain red
     */
    siblings: () => DomProxyCollection<T>
  }

  /**
   * A proxy covering a collection of HTML elements that allows you to chain methods sequentially (including asynchronous tasks) and then execute them all at once.
   *
   * Methods:
   * - {@link DomProxyCollection.on} - Add an event listener to the elements
   * - {@link DomProxyCollection.once} - Add an event listener that will only fire once to the elements
   * - {@link DomProxyCollection.off} - Remove an event listener from the elements
   * - {@link DomProxyCollection.delegate} - Delegate an event listener to the elements
   * - {@link DomProxyCollection.html} - Change the HTML of the elements with an **UNSANITIZED** string of new HTML. This is useful if you want to add a script tag or something. If you want to sanitize the HTML, use `sanitize` instead.
   * - {@link DomProxyCollection.sanitize} - Sanitizes a string of untrusted HTML using the setHTML API, and sets the sanitized HTML to the matched elements. Offers protection against XSS attacks.
   * - {@link DomProxyCollection.text} - Change the text of the elements while retaining the HTML.
   * - {@link DomProxyCollection.val} - Sets the value of all DOM elements in the collection based on their type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
   * - {@link DomProxyCollection.css} - Add a CSS Rule to the elements. If the first argument is an object, it will be treated as a map of CSS properties and values. Otherwise, it will be treated as a single CSS property and the second argument will be treated as the value.
   * - {@link DomProxyCollection.addStylesheet} - Add a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got a good idea for how to make this scoped to a single element? Open a PR!
   * - {@link DomProxyCollection.addClass} - Add a class to the elements
   * - {@link DomProxyCollection.removeClass} - Remove a class from the elements
   * - {@link DomProxyCollection.toggleClass} - Toggle a class on the elements
   * - {@link DomProxyCollection.set} - Set an attribute on the elements. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
   * - {@link DomProxyCollection.unset} - Remove an attribute from the elements
   * - {@link DomProxyCollection.toggle} - Toggle an attribute on the elements
   * - {@link DomProxyCollection.data} - Set a data attribute on the elements.
   * - {@link DomProxyCollection.attach} - Attaches children to the elements based on the provided options.
   * - {@link DomProxyCollection.cloneTo} - Clones the elements to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original elements remain in their current location. If you want to move the elements instead of cloning them, use {@link DomProxyCollection.moveTo}.
   * - {@link DomProxyCollection.moveTo} - Moves the elements to a new parent element in the DOM. By default, it is appended inside the new parent element, but you change change this with the `position` option. The original elements are removed from their current location. The `all` option is technically available, but it will simply use the last element in the collection. This is because you can only move an element to one place at a time. If you want to clone the elements instead of moving them, use {@link DomProxyCollection.cloneTo}.
   * - {@link DomProxyCollection.become} - Replaces the elements with new elements. By default, the elements are moved to the new location. To clone them instead, set the mode to 'clone'.
   * - {@link DomProxyCollection.purge} - Remove the elements from the DOM entirely
   * - {@link DomProxyCollection.fromJSON} - Fetches a JSON resource from the provided URL and applies a transformation function which uses the fetched JSON and the proxy's target element as arguments.
   * - {@link DomProxyCollection.fromHTML} - Fetches an HTML resource from the provided URL and inserts it into the proxy's target element.
   * - {@link DomProxyCollection.do} - Executes an asynchronous function and waits for it to resolve before continuing the chain (can be synchronous too)
   * - {@link DomProxyCollection.defer} - Schedules a function for deferred execution on the elements. This will push the operation to the very end of the internal event loop.
   * - {@link DomProxyCollection.transition} - Animate the elements using the WAAPI. The queue will wait for the animation to complete before continuing.
   * - {@link DomProxyCollection.wait} - Sets a timeout for the given number of milliseconds and waits for it to resolve before continuing the chain
   * - {@link DomProxyCollection.next} - Switch to every existing nextElementSibling for each element in the collection
   * - {@link DomProxyCollection.prev} - Switch to every existing previousElementSibling for each element in the collection
   * - {@link DomProxyCollection.first} - Switch to every existing firstChild for each element in the collection
   * - {@link DomProxyCollection.last} - Switch to every existing lastChild for each element in the collection
   * - {@link DomProxyCollection.parent} - Switch to every existing parentElement for each element in the collection
   * - {@link DomProxyCollection.ancestor} - Switch to the closest ancestor matching a selector for each element in the collection
   * - {@link DomProxyCollection.pick} - Switch to a collection of the first descendant of each element that matches a selector in the middle of a chain
   * - {@link DomProxyCollection.pickAll} - Switch to a collection of all of the descendants of the elements that match a selector in the middle of a chain
   * - {@link DomProxyCollection.kids} - Switch to a collection of any existing children of the elements in the middle of a chain
   * - {@link DomProxyCollection.siblings} - Switch to a collection of any existing siblings of the elements in the middle of a chain
   */
  export interface DomProxyCollection<T extends HTMLElement = HTMLElement>
    extends Array<T> {
    /** Add an event listener to the elements
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxyCollection}
     * @example
     * $('button').on('click', () => console.log('clicked'))
     */
    on(
      ev: string,
      fn: EventListenerOrEventListenerObject
    ): DomProxyCollection<T>

    /** Add an event listener that will only fire once to the elements
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxyCollection}
     * @example
     * $('button').once('click', () => console.log('clicked'))
     * // The event listener will only fire once
     */
    once(
      ev: string,
      fn: EventListenerOrEventListenerObject
    ): DomProxyCollection<T>

    /** Remove an event listener from the elements
     * @param ev The event name
     * @param fn The event listener
     * @returns This {@link DomProxyCollection}
     * @example
     * $('button').off('click', clickHandler)
     * // The event listener will no longer fire
     */
    off(
      ev: string,
      fn: EventListenerOrEventListenerObject
    ): DomProxyCollection<T>

    /** Delegate an event listener to the elements
     * @param event The event name
     * @param subSelector The sub-selector
     * @param handler The event handler
     * @returns This {@link DomProxyCollection}
     * @example
     * $('.container').delegate('click', '.buttons', (e) => console.log('Button clicked'))
     */
    delegate: (
      event: string,
      subSelector: string,
      handler: EventListenerOrEventListenerObject
    ) => DomProxyCollection<T>

    /** Change the HTML of the element The string will **NOT** be sanitized. If you want to sanitize the HTML, use `sanitize` instead.
     * @param newHtml The new HTML
     * @returns This {@link DomProxyCollection}
     * @example
     * $('.container').html('<span>New Content</span>')
     */
    html: (newHtml: string) => DomProxyCollection<T>

    /**
     * Sanitizes a string of untrusted HTML using the setHTML API, and sets the sanitized HTML to the matched element(s).
     * Provides protection against XSS attacks.
     *
     * @param {string} html - Untrusted HTML string to sanitize and set.
     * @param {Sanitizer} [sanitizer] - An instance of Sanitizer to customize the sanitization. Defaults to a new Sanitizer() with default configuration.
     * @returns {DomProxyCollection} - The matched elements with the sanitized content set.
     *
     * @example
     * const maliciousHTML = '<span>Safe Content</span><script>alert("hacked!")</script>';
     * const customSanitizer = new Sanitizer({
     *   allowElements: ['span']
     * });
     * $('.targetElement').sanitize(maliciousHTML, customSanitizer);
     * // The .targetElement will only contain the 'Safe Content' span; the script and other unwanted tags will be removed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML}
     */
    sanitize: (html: string, sanitizer?: Sanitizer) => DomProxyCollection<T>

    /** Change the text of the elements
     * @param newText The new text
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').text('Click me!')
     */
    text: (newText: string) => DomProxyCollection<T>

    /**
     * Sets the value of all DOM elements in the collection based on their type. For form elements such as inputs, textareas, and selects, the appropriate property (e.g., `value`, `checked`) will be adjusted. For other elements, the `textContent` property will be set.
     * @param newValue - The value to be set. This can be a string, number, an array for multi-selects, a FileList for file inputs, or a boolean for checkboxes.
     *   - For `input[type="checkbox"]`: A truthy value sets it to checked, otherwise unchecked.
     *  - For `input[type="radio"]`: If the `newValue` matches the input's value, it's checked.
     * - For `input[type="file"]`: Sets the input's `files` property (expects a FileList or similar).
     * - For `select[multiple]`: Expects an array of values to select multiple options.
     * @returns This {@link DomProxyCollection}.
     * @example
     * $('input[type="text"]').value('New Value')
     * $('input[type="checkbox"]').value(true)
     * $('input[type="radio"]').value('radio1')
     * $('input[type="file"]').value(myFileList)
     * $('select[multiple]').value(['option1', 'option2'])
     */
    val: (
      newValue: string | number | (string | number)[] | FileList
    ) => DomProxyCollection<T>

    /** Adds one or more CSS rule(s) to the elements. If the first argument is an object, it will be treated as a map of CSS properties and values. Otherwise, it will be treated as a single CSS property and the second argument will be treated as the value.
     * @param prop The CSS property
     * @param value The CSS value
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').css('color', 'red')
     * OR
     * $$('.buttons').css({ color: 'red', backgroundColor: 'blue' })
     */
    css: (
      propOrObj: string | { [key: string]: string | number },
      value?: string
    ) => DomProxyCollection<T>

    /** Add a stylesheet to the ENTIRE DOCUMENT (this is useful for things like :hover styles). Got a good idea for how to make this scoped to a single element? Open a PR!
     * @param css The CSS to add
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').addStylesheet('button:hover { color: red; }')
     * // Now all buttons on the page will turn red when hovered
     */
    addStylesheet: (css: string) => DomProxyCollection<T>

    /** Add a class to the elements
     * @param className The class name
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').addClass('btn')
     */
    addClass: (className: string) => DomProxyCollection<T>

    /** Remove a class from the elements
     * @param className The class name
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').removeClass('btn')
     */
    removeClass: (className: string) => DomProxyCollection<T>

    /** Toggle a class on the elements
     * @param className The class name
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').toggleClass('btn')
     */
    toggleClass: (className: string) => DomProxyCollection<T>

    /** Set an attribute on the elements. If the value is undefined, it will be set to `""`, which is useful for boolean attributes like disabled or hidden.
     * @param attr The attribute name
     * @param value The attribute value
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').set('disabled')
     * $$('.buttons').set('formaction', '/submit')
     */
    set: (attr: string, value: string) => DomProxyCollection<T>

    /** Remove an attribute from the elements
     * @param attr The attribute name
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').unset('disabled')
     */
    unset: (attr: string) => DomProxyCollection<T>

    /** Toggle an attribute on the elements
     * @param attr The attribute name
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').toggle('disabled')
     */
    toggle: (attr: string) => DomProxyCollection<T>

    /** Set a data attribute on the elements.
     * @param key The dataset key
     * @param value The corresponding value for the dataset key
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').data('info', 'extraDetails')
     * This implies: element.dataset.info = 'extraDetails'
     */
    data: (key: string, value: string) => DomProxyCollection<T>

    /**
     * Attaches children to the elements based on the provided options.
     * The children can be:
     * - A string of HTML
     * - A CSS selector
     * - An HTMLElement
     * - A DomProxy
     * - An array of any of the above
     * The position can be:
     * - 'append' (default): Adds the children to the end of the element.
     * - 'prepend': Adds the children to the beginning of the element.
     * - 'before': Adds the children before the element.
     * - 'after': Adds the children after the element.
     * The HTML is sanitized by default, which helps prevent XSS attacks.
     * If you want to disable sanitization, set the `sanitize` option to `false`.
     * @param {...*} children - The children to attach. The last argument can be an options object.
     * @param {Object} [options] - The options object.
     * @param {('append'|'prepend'|'before'|'after')} [options.position='append'] - Where to attach the children.
     * @param {boolean} [options.sanitize=true] - Whether or not to sanitize the HTML.
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').attach('<span>Click me!</span>');
     * $$('.buttons').attach($('.container'), { position: 'prepend' });
     * $$('.buttons').attach([$('.container'), '<span>Click me!</span>'], { position: 'before' });
     * $$('.buttons').attach('<image src="x" onerror="alert(\'hacked!\')">'); // No XSS attack here!
     * $$('.buttons').attach('<image src="x" onerror="alert(\'hacked!\')">', { sanitize: false }); // XSS attack here!
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    attach: (...children: ChildInput[]) => DomProxyCollection<T>

    /**
     * Move a clone of the elements to a new parent element in the DOM. The original elements remain in their current location. By default, they are appended inside the new parent element, but you change change this with the `position` option. If you want to move the elements instead of cloning them, use {@link DomProxyCollection.moveTo}
     * @param parentSelector CSS selector for the parent element to which the cloned elements will be added.
     * @param options Optional configuration for the function behavior.
     * @param {boolean} [options.all=false] If set to true, the elements will be cloned or moved to all elements matching the parentSelector.
     * @param {"before" | "after" | "prepend" | "append"} [options.position="append"] If not selected, the elements will be placed inside the parent element after any existing children. If you want them right outside of the parent element, use 'before' or 'after'. If you want them to be the first child, use 'prepend'.
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').cloneTo('.target')
     * // Clones and appends to .target (default behavior)
     * @example
     * $$('.buttons').cloneTo('.target', { position: 'prepend' })
     * // Clones and prepends to .target as first child
     * @example
     * $$('.buttons').cloneTo('.target', { all: true })
     * // Clones and appends to all .target elements
     * @example
     * $$('.buttons').cloneTo('.target', { all: true, position: 'before' })
     * // Clones and adds elements just before all .target elements
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    cloneTo: (
      parentSelector: string,
      options?: MoveOrCloneOptions
    ) => DomProxyCollection<T>

    /**
     * Move the elements to a new parent element in the DOM. By default, they are appended inside the new parent element, but you change change this with the `position` option. The original elements are removed from their current location. The `all` option is technically available, but it will simply use the last element in the collection. This is because you can only move an element to one place at a time. If you want to clone the elements instead of moving them, use {@link DomProxyCollection.cloneTo}
     * @param parentSelector CSS selector for the parent element to which the elements will be moved.
     * @param options Optional configuration for the function behavior.
     * @param {"before" | "after" | "prepend" | "append"} [options.position="append"] If not selected, the elements will be placed inside the parent element after any existing children. If you want them right outside of the parent element, use 'before' or 'after'. If you want them to be the first child, use 'prepend'.
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').moveTo('.target')
     * // Moves and appends to .target (default behavior)
     * @example
     * $$('.buttons').moveTo('.target', { position: 'prepend' })
     * // Moves and prepends to .target as first child
     * @see https://stackoverflow.com/questions/14846506/append-prepend-after-and-before
     */
    moveTo: (
      parentSelector: string,
      options?: MoveOrCloneOptions
    ) => DomProxyCollection<T>

    /**
     * The $.become method replaces the collection of elements wrapped by the DomProxyCollection instance. This is an enhanced, bulk-operation version of `$.become`.
     *
     * #### Mode Option
     * - `"clone"`: Each replacement element is cloned. This is useful to keep the original elements intact.
     * - `"move"`: Elements are moved to the new location as-is.
     *
     * #### Match Option
     * - `"cycle"`: When the length of `replacements` is less than the collection length, it will cycle through `replacements` to fill the rest.
     * - `"remove"`: If a replacement for a specific element isn't provided, that element will be removed.
     *
     * @param {Array<HTMLElement>|DomProxy} replacements - An array of HTMLElements or a DomProxy instance to replace the current collection of elements.
     * @param {Object} [options] - An options object to control the mode and matching strategy.
     * @param {"move"|"clone"} [options.mode="clone"] - Determines whether the replacement elements are cloned or moved.
     * @param {"cycle"|"remove"} [options.match="cycle"] - Matching strategy for when the elements to be replaced outnumber the replacements.
     * @returns {DomProxyCollection} - Returns the current DomProxyCollection for chaining.
     *
     * @example
     * // Replaces each button with elements from `newElements`, cycling through `newElements` if needed.
     * $$('.buttons').become(newElements, { mode: "move", match: "cycle" })
     *
     * @example
     * // Replaces each button in the collection with a deep-clone of elements from `newElements`.
     * $$('.buttons').become(newElements, { mode: "clone" })
     *
     * @example
     * // Replaces each button with elements from another DomProxy. If fewer, cycles through them.
     * $$('.buttons').become($$('.otherButtons'))
     *
     * @example
     * // Replaces each button with elements from `newElements`. If an element in the collection lacks a replacement, it is removed.
     * $$('.buttons').become(newElements, { mode: "move", match: "remove" })
     */
    become: (
      replacements: Array<HTMLElement> | DomProxy,
      options?: { mode?: "move" | "clone"; match?: "cycle" | "remove" }
    ) => DomProxyCollection<T>

    /** Remove the elements from the DOM
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').purge()
     */
    purge: () => DomProxyCollection<T>

    /**
     * Sends HTTP requests using each of the current element as the body of the requests unless otherwise specified.
     *
     * None of the options are required-- not even the URL.
     *
     * If you do not provide a URL the method will:
     * - First, look to see if it's in a form with an action property and use that.
     * - If it can't find that, it will look to see if the element is a button with a formaction property and use that.
     * - If it can't find that, it will try to see if the element is part of a form that has an action property and use that.
     * - Finally, if it can't find anything else, it will use the current URL.
     *
     * Unless the `body` option is provided, it will be created automatically based on the element type:
     * - If it's a form, the entire form will be serialized using the formData API unless a custom serializer is provided.
     * - If it's an input, textarea, or select, the value will be used.
     * - If it isn't a form or one of the above elements, we will check to see if the element has a form property or one can be found with the `closest` method. If so, we will serialize the form using the formData API unless a custom serializer is provided.
     * - If none of the above, the element's textContent will be used.
     *
     * If the `json` option is set to true, the request will be sent as JSON and the response will be parsed as JSON.
     *
     * Otherwise, the request will be sent as FormData and the response will be parsed as text.
     *
     * @param {Element} element - The DOM element to gather data from and determine type of the request.
     * @param {object} options - Configuration for the AJAX request.
     * @param {string} [options.url] - Endpoint for the request. Defaults to element’s action/formAction.
     * @param {string} [options.method="POST"] - HTTP method for the request. This defaults to POST, but it accepts any valid HTTP method.
     * @param {boolean} [options.json=false] - If true, sends and expects JSON, otherwise sends FormData.
     * @param {any} [options.body] - Body of the request. Defaults to form/input field content.
     * @param {Event} [options.event] - Event object to prevent default behavior.
     * @param {function} [options.serializer] - Custom function to serialize form data.
     * @param {string} [options.error] - Error message for display/update on failed request.
     * @param {string} [options.fallback] - Message/content to display during request processing.
     * @param {function} [options.onError] - Callback for request errors.
     * @param {function} [options.onSuccess] - Callback for all requests, triggered finally.
     *
     * @returns {DomProxyCollection} - The matched elements with the updated content.
     *
     * @example
     * $$('.buttons').send({ url: '/api/submit' });
     * @example
     * $$('.buttons').send({ url: '/api/submit', method: 'GET' });
     * @example
     * $$('.buttons').send({ url: '/api/submit', json: true });
     * @example
     * $$('.form').send({
     *  url: '/api/submit',
     *  body: { foo: 'bar' },
     *  method: 'POST',
     *  json: true,
     *  onError: (err) => console.log(err),
     *  onSuccess: () => console.log('Request complete.')
     * });
     */
    send: (
      options: {
        url?: string
        json?: boolean
        event?: Event
        serializer?: () => void
      } & FetchOptions
    ) => DomProxyCollection<T>

    /**
     * Fetches a JSON resource from the provided URL, applies a transformation function on it and the proxy's target elements.
     * @param {string} url - The URL to fetch the JSON from.
     * @param {function} transformFunc - The function that applies transformations on the fetched JSON and each of the proxy's target elements.
     * @param {FetchOptions} [options={}] - Options for the fetch operation.
     * @param {string} [options.error] - A message to display if the fetch fails.
     * @param {string} [options.fallback] - A message to display while the fetch is in progress.
     * @param {function} [options.onSuccess] - A callback to execute when the fetch is complete.
     *
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.items').fromJSON('/api/data', (element, json) => {
     *     element.text(json.value);
     * });
     * @example
     * $$('.items').fromJSON('/api/data', (element, json) => {
     *    const {author, quote} = json;
     *
     *    element.html(`<p>${quote}</p>
     *      <footer>${author}</footer>`);
     * });
     * @example
     * $$('.news').fromJSON('/api/news', (element, json) => {
     *   const {title, description, url} = json;
     *
     *  element.html(`<h2>${title}</h2>
     *   <p>${description}</p>
     *  <a href="${url}">Read more</a>`);
     *  },
     *  {
     *   fallback: 'Loading the article...',
     *   error: 'Failed to load the article.'
     *   onSuccess: () => console.log('Article loaded.')
     * });
     */
    fromJSON: (
      url: string,
      transformFunc: (el: DomProxyCollection<T>, json: any) => void,
      options?: FetchOptions
    ) => DomProxyCollection<T>

    /**
     * Fetches an HTML resource from the provided URL and inserts it into the proxy's target elements.
     * @param {string} url - The URL to fetch the HTML from.
     * @param {FetchOptions} [options={}] - Options for the fetch operation.
     * @param {string} [options.error] - A message to display if the fetch fails.
     * @param {string} [options.fallback] - A message to display while the fetch is in progress.
     * @param {boolean} [options.sanitize=true] - Determines if the fetched HTML should be sanitized before insertion. Defaults to true.
     * @param {function} [options.sanitizer] - A custom sanitizer to use for sanitization. {@link https://developer.mozilla.org/en-US/docs/Web/API/Sanitizer/Sanitizer}
     *
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.template').fromHTML('/template.html');
     * @example
     * $$('.updates').fromHTML('/updates.html', { fallback: 'Checking for updates...', error: 'Failed to check for updates!' });
     * @example
     * $$('.content').fromHTML('/malicious-content.html', { sanitize: false });
     */
    fromHTML: (url: string, options?: FetchOptions) => DomProxyCollection<T>

    /**
     * Dynamically fetches data from the provided URL and updates multiple DOM elements using a stream or Server-Sent Event (SSE).
     *
     * @param {string} url - The source URL to retrieve data from.
     * @param {object} [options={}] - Configurations for the stream operation.
     * @param {boolean} [options.sse=false] - If set to true, fetches data using SSE. Otherwise, uses a generic data stream.
     * @param {boolean} [options.add=false] - For SSE, if set to true, appends new data to existing content of each element. Otherwise, it replaces the content in all targeted elements.
     * @param {string} [options.error="An error occurred."] - The message displayed if the stream encounters an error.
     * @param {string} [options.fallback="Loading..."] - The message displayed while the stream is connecting or data is loading.
     * @param {boolean} [options.sanitize=true] - If set to true, sanitizes incoming HTML content before injecting it into the DOM to prevent potential XSS attacks.
     * @param {function} [options.onSuccess] - Callback invoked upon stream completion or after each SSE message is received for each element. Receives the last data chunk or SSE event as an argument.
     *
     * @returns {DomProxyCollection} - Returns the instance of DomProxyCollection for chaining.
     *
     * @example
     * // Streaming generic data into multiple elements.
     * $$('.articles').fromStream('/api/articles');
     *
     * // Streaming with SSE and appending data to existing content in multiple elements.
     * $$('.liveUpdates').fromStream('/api/updates', {
     *   sse: true,
     *   add: true,
     *   onSuccess: (data) => console.log('New update:', data)
     * });
     */
    fromStream: (
      url: string,
      options?: {
        sse?: boolean
        add?: boolean
        error?: string
        fallback?: string
        sanitize?: boolean
        onSuccess?: (data: any) => void
      }
    ) => DomProxyCollection<T>

    /** Execute an asynchronous function and wait for it to resolve before continuing the chain (can be synchronous too)
     * @param fn The async callback. This can receive the element as an argument.
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons')
     * .css('color', 'red')
     * .do(async (el) => { // The element is passed as an argument
     *   const response = await fetch('/api')
     *  const data = await response.json()
     * el.text(data.message) // All the methods are still available
     * })
     * .css('color', 'blue')
     */
    do: (
      fn: (el: DomProxyCollection) => Promise<void> | void
    ) => DomProxyCollection<T>

    /** Schedules a function for deferred execution on the elements. This will push the operation to the very end of the internal event loop.
     *
     * Usually, everything will happen in sequence anyways. Given the predictability of each queue, `defer` has limited use cases and should be used sparingly. The whole point of JessQuery is to make things predictable, so you should just put the function at the end of the chain if you can.
     *
     * The only problem is if you set up an event listener using a variable that has lots of queued behavior-- especially calls to the `wait` method. Just wrap the `wait` call and everything after it in `defer` to ensure that event handlers don't get stuck behind these in the queue.
     *
     * This will capture the state of the DomProxyCollection BEFORE THE CHAIN and pass it to the function, so this should not be mixed with context switching methods like `next` or `pick`.
     *
     * Honestly, I'm not sure if this even makes much sense. I just spent a bunch of time building a crazy queue system, and I feel like I need to expose it. If you have any ideas for how to make this more useful, please open an issue or PR.
     *
     * @param {function(DomProxyCollection): void} fn - The function to be deferred for later execution. It will be passed the DomProxy instance as an argument.
     * @returns {DomProxyCollection} - The DomProxyCollection instance, allowing for method chaining.
     *
     * @example
     * $$('.buttons')
     *  .on('click', () => buttons.text('Clicked!'))
     *  .wait(1000) // The event handler will be stuck behind this for 1 second
     *
     * $$('.buttons')
     * .on('click', () => buttons.text('Clicked!'))
     * .defer(() => buttons.wait(1000)) // The event handler will be executed immediately
     *
     * // Take note that this is only an issue if you're using the same variable for both the event handler and the queued behavior.
     * $$('button')
     * .on('click', () => $$('.buttons').text('Clicked!'))
     * .wait(1000) // This is fine because the event handler is not sharing a queue with the `wait` call
     *
     * @example
     * // Please limit the use of this method anywhere other than the end of a chain. That's confusing.
     * // Only use it for race conditions or other edge cases.
     * display
     *    .defer((el) => el.css("color", "blue"))
     *    .text("HALF A SECOND OF GLORY") // Text is black
     *    .wait(500).text("Hello, world!") // Text is red
     *    .css("color", "red"))
     *    .wait(500).text("Goodbye, world!") // Text is blue
     * // This is missing the point of JessQuery. Just put each method in sequence.
     */
    defer: (fn: (el: DomProxyCollection) => void) => DomProxyCollection<T>

    /** Animate the elements using the WAAPI
     *  - Returns the proxy so you can continue chaining. If you need to return the animation object, use the `animate` method instead.
     *  - Remember, this method is blocking, so watch out for any event handlers using the same variable.
     *
     * **Keyframes**:
     *
     * The keyframes can be specified in a few different ways:
     *
     * - *Array* - An array of objects (keyframes) consisting of properties and values to iterate over. This is the canonical format returned by the `getKeyframes()` method. Each keyframe is an object containing the CSS properties and values to animate. The first keyframe is the "from" keyframe, and the last keyframe is the "to" keyframe. The number of keyframes is arbitrary.
     *
     * Example:
     *
     * ```js
     * $('button').animate([
     *  { opacity: 0, color: '#fff' },
     * { opacity: 1, color: '#000' }
     * ], 2000)
     * ```
     * - *Object* - An object containing the CSS properties and values to animate. The keys are the CSS properties, and the values are the CSS values. The object is treated as a single keyframe. The key is the property to animate, and the value is an array of values to iterate over. The number of elements in each array does not need to be equal. The provided values will be spaced out independently.
     *
     * Example:
     *
     * ```js
     * $('button').animate({
     * opacity: [0, 1], // [ from, to ]
     * color: ['#fff', '#000'] // [ from, to ]
     * }, 2000)
     * ```
     * **Options**:
     *
     * Either an integer representing the animation's duration (in milliseconds), or an Object containing one or more timing properties described in the `KeyframeEffect()` options parameter and/or the following options:
     *
     * - *Number* - The duration of the animation in milliseconds.
     * - *Object* - An object containing the animation options. The options are the same as the options for the `KeyframeEffect` constructor.
     *
     *    - *id* - A string with which to reference the animation.
     *    - *rangeStart* - Specifies the start of an animation's attachment range along its timeline, i.e. where along the timeline an animation will start. The JavaScript equivalent of the CSS `animation-range-start` property. `rangeStart` can take the same value types as `rangeEnd`.
     *    - *rangeEnd* - Specifies the end of an animation's attachment range along its timeline, i.e. where along the timeline an animation will end. The JavaScript equivalent of the CSS `animation-range-end` property.
     *    - *timeline* - The `AnimationTimeline` to associate with the animation. Defaults to `Document.timeline`. The JavaScript equivalent of the CSS `animation-timeline` property.
     *
     * @param keyframes The keyframes to animate
     * @param options The animation options
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').transition([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
     */
    transition(
      keyframes: Keyframe[] | PropertyIndexedKeyframes,
      options: KeyframeAnimationOptions
    ): DomProxyCollection<T>

    /** Await a timeout before continuing the chain
     *
     *  - Remember, this method is blocking, so watch out for any event handlers using the same variable.
     * @param ms The number of milliseconds to wait
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').css('color', 'red').wait(1000).css('color', 'blue')
     */
    wait: (ms: number) => DomProxyCollection<T>

    /** Switch to the nextElementSibling of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The next DomProxyCollection
     * @example
     * $$('.buttons')
     * .css('color', 'red')
     * .next()
     * .css('color', 'blue')
     * // the next elements will turn blue
     * // the buttons themselves will remain red
     */
    next: () => DomProxyCollection<T>

    /** Switch to the previousElementSibling of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The previous DomProxyCollection
     * @example
     * $$('.buttons')
     * .css('color', 'red')
     * .prev()
     * .css('color', 'blue')
     * // the previous elements will turn blue
     * // the buttons themselves will remain red
     */
    prev: () => DomProxyCollection<T>

    /** Switch to the firstChild of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The first child DomProxyCollection
     * @example
     * $$('.container')
     * .css('color', 'red')
     * .first()
     * .css('color', 'blue')
     * // the first children will turn blue
     * // the containers themselves will remain red
     */
    first: () => DomProxyCollection<T>

    /** Switch to the lastChild of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The last child DomProxyCollection
     * @example
     * $$('.container')
     * .css('color', 'red')
     * .last()
     * .css('color', 'blue')
     * // the last children will turn blue
     * // the containers themselves will remain red
     */
    last: () => DomProxyCollection<T>

    /** Switch to the parents of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The parent DomProxyCollection
     * @example
     * $$('.buttons')
     * .css('color', 'red')
     * .parent()
     * .css('color', 'blue')
     * // the parents of the buttons will turn blue
     * // the buttons themselves will remain red
     */
    parent: () => DomProxyCollection<T>

    /** Switch to the closest existing ancestor of each element that matches a selector in the middle of a chain. Uses the native `closest` method.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param ancestorSelector The ancestor selector
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.buttons').ancestor('.container')
     */
    ancestor: (ancestorSelector: string) => DomProxyCollection<T>

    /** Switch to the first descendant of each of the elements that matches a selector  in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param subSelector The sub-selector
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.container').pick('.buttons')
     */
    pick: (subSelector: string) => DomProxyCollection<T>

    /** Switch to a collection of all of the descendants of each of the elements that match a selector in the middle of a chain
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @param subSelector The sub-selector
     * @returns This {@link DomProxyCollection}
     * @example
     * $$('.container').pickAll('.buttons')
     */
    pickAll: (subSelector: string) => DomProxyCollection<T>

    /** Switch to the children of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The child DomProxyCollection
     * @example
     * $$('.container')
     * .css('color', 'red')
     * .kids()
     * .css('color', 'blue')
     * // All the children of the containers will turn blue
     * // The containers themselves will remain red
     */
    kids: () => DomProxyCollection<T>

    /** Switch to the siblings of the elements in the middle of a chain.
     *
     * This will throw an error if the proxy was created as "fixed" (with a second argument of true).
     * @returns The sibling DomProxyCollection
     * @example
     * $$('.buttons')
     * .css('color', 'red')
     * .siblings()
     * .css('color', 'blue')
     * // All the siblings of the buttons will turn blue
     * // The buttons themselves will remain red
     */
    siblings: () => DomProxyCollection<T>
  }

  /**
   * Finds the first element in the DOM that matches a CSS selector and returns it with some extra, useful methods.
   *
   * These methods can be chained together to create a sequence of actions that will be executed in order (including asynchronous tasks).
   *
   * If the 'fixed' parameter is set to true, the proxy reference is fixed and cannot be switched to target another DOM element.
   *
   * Every method returns a {@link DomProxy} or {@link DomProxyCollection} object, which can be used to continue the chain.
   * @param {string} selector - The CSS selector to match
   * @param {boolean} [fixed=false] - Determines if the proxy reference should be fixed. Defaults to false.
   * @returns A {@link DomProxy} object representing the first element in the DOM that matches the selector
   * @example
   * $('button')
   *    .on('click', () => console.log('Clicked!'))
   *    .css('color', 'purple')
   *    .wait(1000)
   *    .css('color', 'lightblue')
   *    .text('Click me!')
   *    .parent()
   *     // This will switch the proxy to the parent of the button
   *    .css('color', 'red')
   *     // All good! The parent will turn red and the button will remain light blue
   *
   * @example
   * $('button', true)
   *   .on('click', () => console.log('Clicked!'))
   *   .css('color', 'purple')
   *   .parent()
   *   // This will throw an error because the proxy is fixed
   */
  export function $<S extends string>(
    selector: S,
    fixed?: boolean
  ): DomProxy<ElementForTag<S>>
  export function $<T extends HTMLElement>(
    selector: string,
    fixed?: boolean
  ): DomProxy<T>

  /**
   * Finds all elements in the DOM that match a CSS selector and returns them with some extra, useful methods.
   *
   * These methods can be chained together to create a sequence of actions that will be executed in order (including asynchronous tasks).
   *
   * If the 'fixed' parameter is set to true, the proxy reference is fixed and cannot be switched to target another set of DOM elements.
   *
   * Every method returns a {@link DomProxy} or {@link DomProxyCollection} object, which can be used to continue the chain.
   * @param {string} selector - The CSS selector to match
   * @param {boolean} [fixed=false] - Determines if the proxy reference should be fixed. Defaults to false.
   * @returns A {@link DomProxyCollection} object representing all elements in the DOM that match the selector
   * @example
   * $$('.buttons')
   *   .on('click', () => console.log('Clicked!'))
   *   .css('color', 'purple')
   *   .wait(1000)
   *   .css('color', 'lightblue')
   *   .text('Click me!')
   *   .parent()
   *   // This will switch the proxy to the parent of the buttons
   *   .css('color', 'red')
   *   // All good! The parent will turn red and the buttons will remain light blue
   *
   * @example
   * $$('.buttons', true)
   *  .on('click', () => console.log('Clicked!'))
   *  .css('color', 'purple')
   *  .parent()
   *  // This will throw an error because the proxy is fixed
   */
  export function $$<S extends string>(
    selector: S,
    fixed?: boolean
  ): DomProxyCollection<ElementForTag<S>>
  export function $$<T extends HTMLElement>(
    selector: string,
    fixed?: boolean
  ): DomProxyCollection<T>

  /**
   * Defines a custom error handler for JessQuery, replacing the default behavior of simply logging errors to the console. The handler can perform any custom logic or side-effects needed.
   *
   * The error handler receives two arguments:
   * - `error`: The Error object thrown or rejected.
   * - `context`: An object containing contextual information, such as function name, arguments, or any other metadata associated with the error. This is particularly useful for debugging and diagnostic purposes.
   *
   * By setting a custom error handler, you replace the default behavior. The custom handler will be executed for every error or rejected promise occurring within JessQuery. The default behavior is to log the error and its context to the console. You can modify this to any behavior, including but not limited to displaying alerts, sending error reports, or suppressing the errors entirely.
   *
   * @param {(error: Error, context: object) => void} handler - The custom error handler function.
   *
   * @example
   * // Basic usage
   * setErrorHandler((err) => {
   *   alert(err.message);
   *   console.log(`Error context: ${JSON.stringify(context)}`);
   * });
   * // Now, an alert displays whenever an error occurs, along with logging the error context.
   * // This will replace the default behavior of merely logging the error to the console.
   *
   * @example
   * // Advanced usage: Sending error reports
   * setErrorHandler((error, context) => {
   *   // Send the error and context to an error reporting service
   *   errorReportingService.send({ error, context });
   * });
   * // Error and context details will be sent to an external error reporting service, aiding in debugging.
   *
   * @example
   * // Suppressing errors
   * setErrorHandler(() => {
   *   // Do nothing, effectively suppressing all errors.
   * });
   * // Errors occurring within JessQuery will be swallowed, showing neither logs nor alerts.
   */
  export function setErrorHandler(
    handler: (error: Error, context: object) => void
  ): void

  /**
   * Transforms any function into one that returns a Promise, enabling easy integration into DomProxy chains. This is particularly useful for things like setTimeout, setInterval, or older APIs that are callback-based. It works just like returning a promise normally, but there are a few conveniences built in:
   *
   * - All promise rejections are automatically caught and directed through the default error handler, which can be customized.
   * - If neither resolve or reject are called within a specified timeout, the promise resolves automatically with no value. This prevents the chain from hanging indefinitely when you simply forget to meet a condition. Remember-- you can always reject the promise at any time.
   * - A `meta` object can be optionally passed to add additional metadata for debugging or error handling. The `meta` object is fully extensible. Any extra fields you add will be accessible in the default error handler, making it highly flexible for diagnostic purposes.
   *
   * Usage in a chain allows you to feed its values into a DomProxy method like `text()` or `html()`, or use it within the {@link DomProxy.do} method to use the element itself as an argument.
   *
   * @param {(...args: any[]) => any} fn - The function to be promisified. Must call either the `resolve` or `reject` function.
   * @param {number} [timeout=5000] - The amount of time in milliseconds to wait before resolving the promise automatically. Defaults to 5000 (5 seconds).
   * @param {object} [meta={}] - Metadata for debugging and error-handling. Can include any key-value pairs. Custom fields will be available in the default error handler.
   *
   * @returns {(...args: any[]) => Promise<any>} - Returns a new function that, when invoked, returns a Promise.
   *
   * @example
   * const fetchApiData = promisify((resolve, reject) => {
   *   const xhr = new XMLHttpRequest();
   *   xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
   *   xhr.onload = () => resolve(xhr.responseText);
   *   xhr.onerror = () => reject(xhr.statusText);
   *   xhr.send();
   * });
   *
   * setErrorHandler((err, meta) => {
   *   $("#display").text(err.message);
   *   console.log(`Metadata: ${JSON.stringify(meta)}`);
   * });
   *
   * button.on("click", () => {
   *   display
   *     .text("Hold on! I'm about to use XHR")
   *     .wait(500)
   *     .do(async (el) => {
   *       const data = await fetchApiData();
   *       el.text(data);
   *     });
   * });
   *
   * @example
   * // Alternative example: Passing the promisified function directly to another method.
   * button.on("click", () => {
   *   display
   *     .text("I betcha don't even know what XHR is!")
   *     .wait(1000)
   *     .text(fetchApiData());
   * });
   *
   * @example
   * // Demonstrating timeout and metadata
   * const onlyWarnIfLoadIsSlow = promisify(
   *   (resolve, reject) => {
   *     const textContent = display.textContent;
   *     if (textContent === "Loading..." || "") {
   *            resolve("Sorry for the delay!");
   *          }
   *   },
   *   500,
   *   {
   *     fnName: "onlyWarnIfLoadIsSlow",
   *     fnArgs: ["arg1", "arg2"],
   *     customDebugInfo: "Additional custom information"
   *   }
   * );
   *
   * // Customizing error handler to make use of metadata
   * setErrorHandler((err, meta) => {
   *   console.error(`Error: ${err.message}, Function: ${meta.fnName}, Args: ${meta.fnArgs}, Custom Info: ${meta.customDebugInfo}`);
   * });
   */
  export function promisify(
    fn: (...args: any[]) => void,
    timeout?: number,
    meta?: { [key: string]: any }
  ): (...args: any[]) => Promise<any>

  interface FetchOptions extends RequestInit {
    fallback?: string
    onSuccess?: () => void
    error?: string
    sanitize?: boolean
    sanitizer?: Function
  }

  type ChildInput = string | HTMLElement | DomProxy | ChildInput[]

  type MoveOrCloneOptions = {
    mode?: "move" | "clone"
    position?: "before" | "after" | "prepend" | "append"
    all?: boolean
  }

  type ElementForTag<S extends string> = S extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[S]
    : HTMLElement
}

interface Element {
  setHTML(input: string, sanitizer?: Sanitizer): void
}

interface SanitizerConfig {
  allowElements?: string[]
  blockElements?: string[]
  dropElements?: string[]
  allowAttributes?: AttributeMatchList
  dropAttributes?: AttributeMatchList
  allowCustomElements?: boolean
  allowUnknownMarkup?: boolean
  allowComments?: boolean
}

type AttributeMatchList = Record<string, string[]>

interface Sanitizer {
  sanitize(input: string): string
  getConfiguration(): SanitizerConfig
  getDefaultConfiguration(): SanitizerConfig
}
