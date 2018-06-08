# Storm Sticky

[![npm version](https://badge.fury.io/js/storm-sticky.svg)](https://badge.fury.io/js/storm-sticky)

Sticky DOM elements - use with restraint and care to avoid jank.

## Example
[https://stormid.github.io/storm-sticky](https://stormid.github.io/storm-sticky)

## Usage
```
npm i -S storm-sticky
```
either using es6 import
```
import Sticky from 'storm-sticky';

Sticky.init('.js-sticky');
```
or aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-sticky.standalone.js')
    .then(() => {
        StormSticky.init('.js-sticky');
    });
```

## Options
```
{
    offset: 0,//from the top of the screen
    callback: false,//triggeed when stuck
    extentDOMElement: false,//DOM node selector, the node's height will determine when the sticky element unsticks
    className: 'is--stuck'//className for active 'stuck' state
}
```
e.g.
```
Sticky.init('.js-sticky', {
    extentDOMElement: '.corresponding-article'
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

This module depends upon Object.assign and window.requestAnimationFrame available in all evergreen browsers. ie9+ is supported with polyfills, ie8+ will work with even more polyfills for Array functions and eventListeners.

## Dependencies
Imports raf-throttle


## License
MIT
