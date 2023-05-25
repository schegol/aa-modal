# <h1 id="intro">AA Modal</h1>
A simple yet flexible jQuery modal plugin to load content into modal popups via AJAX.

## <h2 id="demo">Demo</h2>
WIP

## <h2 id="getting-started">Getting started</h2>
First of all, add the latest stable jQuery library version to your page. Add the AA Modal plugin afterwards. Make sure that jQuery is plugged in ***before*** AA Modal plugin. Javascript files are usually added before the `</body>` closing tag:
```html
<script src="/js/jquery-3.7.0.min.js"></script>
<script src="/js/aa-modal.min.js"></script>
```

Decide which DOM element should trigger the modal opening. Let's take this button as an example:
```html
<button class="modal-trigger">Press me</button>
```

Then create a jQuery object passing the trigger's selector and use the `aamodal()` method on it. Init must occur when the page is ***ready to work with your javascript***. You should also specify `src` of the file that contains data you want to load into your modal:
```javascript
$(function() {
    $('.modal-trigger').aamodal({
        src: '/ajax/modal-content.html',
    });
});
```

It's posible to use inline alternative to specify `src` using `aa-modal-src=""` attribute with your desired DOM trigger element:
```html
<button class="modal-trigger" aa-modal-src="/ajax/modal-content.html">Press me</button>
```

If the `src` is inline, you can skip on passing the options object when initializing the plugin (*if you're okay with using default setting, of course*):
```javascript
$(function () {
    $('.modal-trigger').aamodal();
});
```

<small>It's also planned to add automatical initialization of triggers marked with `aa-modal=""` attribute in later plugin versions.</small>

However, if you want to use custom options, they must be passed in via said options object, like this:
```javascript
$(function() {
    $('.modal-trigger').aamodal({
        src: '/ajax/modal-content.html',
        id: 'myModalId',
        class: 'modal modal--cool',
        animation: 'fadeIn',
    });
});
```
The full list of posiible options for you to customize can be found [down below](#options).

## <h2 id="options">Options</h2>

This list might change and/or expand in later plugin versions so mind your plugin version <small>(it's a good idea to act that way regardless of plugins you use)</small>:

Option name         | Type                                                 | Default value | Description
------------------- | ---------------------------------------------------- | ------------- | -----------
src                 | string                                               |               | Source of the file with modal content for the plugin to reach. Specifying no `src` (either in options object or inline) will lead to a plugin error.
id                  | string                                               | false         | The `id` attribute that will be added to the modal popup. Spaces will be removed from this string.
class               | string                                               | false         | The `class` attribute that will be added to the modal popup. Multiple classes can be passed, use space (` `) to separate them.
closeBtnSelector    | string                                               | false         | Selector for additional elements (buttons) inside the loaded modal popup that will close the modal when pressed on.
closeBtnExternal    | string                                               | false         | Source of external SVG icon that will be loaded into corner close button via AJAX. **Overrides `closeBtnText` option unless it's set to `false`**.
closeBtnText        | string or <span style="color: deeppink">false</span> |<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve"><path fill="#000000" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312 c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312 l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937 c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/></svg>                                                                                       | Text to be shown inside the corner close button (i.e. 'Close'). You can pass a word/phrase or a whole SVG icon. **Setting this option to `false` will remove the button entirely**.
animation           | string                                               | false         | Enables and sets the type of modal body animation. For now availible animations are `fadeIn` and `fromTop`.
animationDuration   | int or <span style="color: deeppink">false</span>    | 400           | If `animation` is on, this option sets it's duration. **Setting this option to `false` makes animation duration 0 ms long**.
overlayFadeDuration | int or <span style="color: deeppink">false</span>    | 200           | Sets how long it takes to modal overlay to fade in (while opening) and fade out (while closing). **Setting this option to `false` makes animation duration 0 ms long**.

## <h2 id="callbacks">Callbacks</h2>

Existing callbacks (*also known as events*):
Callback name  | Parameters     | Description
-------------- | -------------- | -----------
onOpenStart    | event, trigger | Fires when modal opening is triggered
onOpenEnd      | event, trigger | Fires when modal opening is finished (after all opening animations are done and modal content is loaded)
onCloseStart   | event, trigger | Fires when modal closing is triggered
onCloseEnd     | event, trigger | Fires when modal closing is finished (after all closing animations are done and modal parts are removed from DOM *or* next modal popup in chain is about to start loading)

Example:
```javascript
$(function() {
    $('.modal-trigger').aamodal({
        onOpenStart: function(event, trigger) {
            console.log('onOpenStart callback fired, popup started loading');
            console.log('triggered by:');
            console.log(trigger);
            console.log('event object:');
            console.log(event);
        },
        onOpenEnd: function(event, trigger) {
            console.log('onOpenEnd callback fired, popup finished loading');
            console.log('triggered by:');
            console.log(trigger);
            console.log('event object:');
            console.log(event);
        },
    });
});
```

## <h2 id="dependencies">Dependencies</h2>
jQuery 3.6.4 or higher