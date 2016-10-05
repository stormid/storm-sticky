var UTILS = {
		attributelist: require('storm-attributelist'),
		throttle: require('lodash.throttle')
	},
    UI = (function(w, d) {
		'use strict';

		var Sticky = require('./libs/storm-sticky'),
			init = function() {
				Sticky.init('.js-sticky');
			};

		return {
			init: init
		};

	})(window, document, undefined);

global.STORM = {
    UTILS: UTILS,
    UI: UI
};

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.UI.init, false);

