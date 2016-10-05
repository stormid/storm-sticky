#Storm Sticky

Sticky DOM elements

##Usage
```
npm i -S storm-sticky
```

```javascript
var Sticky = require('storm-sticky')
Sticky.init('.js-sticky');
```

```html
<nav class="js-sticky">
    <a href="#section1" class="js-scrollto">Section 1</a>
    <a href="#section2" class="js-scrollto">Section 2</a>
    <a href="#section3" class="js-scrollto">Section 3</a>
</nav>
```

###Options
Defaults:

```javascript
{
    offset: 0,
    callback: null,
    throttle: 16,
    className: 'is--stuck'
}
``