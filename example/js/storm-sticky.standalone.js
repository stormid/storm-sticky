/**
 * @name storm-sticky: Sticky DOM elements
 * @version 0.1.1: Fri, 29 Jun 2018 12:06:29 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormSticky = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaults = {
    offset: 0,
    callback: false,
    extentDOMElement: false,
    className: 'is--stuck'
};

function unwrapExports(x) {
    return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var rafThrottle_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var rafThrottle = function rafThrottle(callback) {
        var requestId = void 0;

        var later = function later(context, args) {
            return function () {
                requestId = null;
                callback.apply(context, args);
            };
        };

        var throttled = function throttled() {
            if (requestId === null || requestId === undefined) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                requestId = requestAnimationFrame(later(this, args));
            }
        };

        throttled.cancel = function () {
            return cancelAnimationFrame(requestId);
        };

        return throttled;
    };

    exports.default = rafThrottle;
});

var throttle = unwrapExports(rafThrottle_1);

var getNodePosition = function getNodePosition(node, offset) {
    var location = 0;
    if (node.offsetParent) {
        do {
            location += node.offsetTop;
            node = node.offsetParent;
        } while (node);
    } else {
        location = node.offsetTop;
    }
    return location - offset > 0 ? location - offset : 0;
};

var componentPrototype = {
    init: function init() {
        this.getTriggerOffset();
        this.throttledCheck = throttle(this.check.bind(this));
        this.boundGetTriggerOffset = this.getTriggerOffset.bind(this);

        document.addEventListener('scroll', this.throttledCheck);
        window.addEventListener('resize', this.throttledCheck);
        window.addEventListener('resize', this.boundGetTriggerOffset);
        this.check();

        return this;
    },
    getTriggerOffset: function getTriggerOffset() {
        var cachedDisplayStyle = this.DOMElement.style.position;

        this.DOMElement.style.position = 'static';
        // this.triggerOffset = this.DOMElement.getBoundingClientRect().top + (document.body.scrollTop || ~~document.body.scrollTop) + this.settings.offset;
        this.triggerOffset = getNodePosition(this.DOMElement, this.settings.offset);
        this.DOMElement.style.position = cachedDisplayStyle;
    },
    check: function check() {
        if (!this.shouldStick()) {
            this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
            return;
        }
        this.DOMElement.classList.add(this.settings.className);
        this.settings.callback && this.settings.callback.call(this);
    },
    shouldStick: function shouldStick() {
        var scrollY = window.pageYOffset;
        return scrollY >= this.triggerOffset && (this.settings.extent ? scrollY <= this.triggerOffset + this.extentNode.offsetHeight : true);
    }
};

var init = function init(sel, opts) {
    var els = [].slice.call(document.querySelectorAll(sel));

    if (!els.length) console.warn('Sticky cannot be initialised, cannot find an element matching the selector ' + sel);

    return els.map(function (el) {
        return Object.assign(Object.create(componentPrototype), {
            DOMElement: el,
            extentNode: opts.extent ? document.querySelector(opts.extent) : false,
            settings: Object.assign({}, defaults, opts)
        }).init();
    });
};

var index = { init: init };

exports.default = index;;
}));
