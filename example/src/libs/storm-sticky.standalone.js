/**
 * @name storm-sticky: 
 * @version 0.1.0: Mon, 09 Jan 2017 17:19:45 GMT
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

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
	offset: 0,
	callback: null,
	unload: true,
	throttle: 16,
	className: 'is--stuck'
},
    StormSticky = {
	init: function init() {
		var _this = this;

		this.getTriggerOffset();
		this.throttled = (0, _throttle2.default)(function () {
			_this.check.call(_this);
		}, this.settings.throttle);

		document.addEventListener('scroll', this.throttled);
		document.addEventListener('resize', this.throttled);
		document.addEventListener('resize', this.getTriggerOffset.bind(this));
		this.check();

		return this;
	},
	getTriggerOffset: function getTriggerOffset() {
		var cachedDisplayStyle = this.DOMElement.style.position;

		this.DOMElement.style.position = 'static';
		this.triggerOffset = this.DOMElement.getBoundingClientRect().top + (document.body.scrollTop || ~~document.body.scrollTop) + this.settings.offset;
		this.DOMElement.style.position = cachedDisplayStyle;
	},
	check: function check() {
		if (this.shouldStick()) {
			this.DOMElement.classList.add(this.settings.className);
			this.settings.callback && this.settings.callback.call(this);

			if (this.settings.unload) {
				document.removeEventListener('scroll', this.throttled, true);
				document.addEventListener('resize', this.throttled, true);
			}
		} else {
			this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
		}
	},
	shouldStick: function shouldStick() {
		return window.pageYOffset >= this.triggerOffset;
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Sticky cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(StormSticky), {
			DOMElement: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

exports.default = { init: init };;
}));
