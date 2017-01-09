#Storm Sticky

[![Build Status](https://travis-ci.org/mjbp/storm-sticky.svg?branch=master)](https://travis-ci.org/mjbp/storm-sticky)
[![codecov.io](http://codecov.io/github/mjbp/storm-sticky/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-sticky?branch=master)
[![npm version](https://badge.fury.io/js/storm-sticky.svg)](https://badge.fury.io/js/storm-sticky)

Sticky DOM elements

##Example
[https://mjbp.github.io/storm-sticky](https://mjbp.github.io/storm-sticky)

##Usage
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

Load('/content/js/async/storm-tab-accordion.standalone.js')
    .then(() => {
        StormTabAccordion.init('.js-tab-accordion');
    });
```
##Options
```
    {
        offset: 0,
        callback: null,
        throttle: 16,
        className: 'is--stuck'
    }
```
e.g.
```
Sticky.init('.js-sticky', {
    callback() {}
});
```
##Tests
```
npm run test
```
##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
None


##License
MIT