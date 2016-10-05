/**
 * @name storm-component-boilerplate: 
 * @version 0.1.1: Wed, 05 Oct 2016 12:35:24 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormSticky = factory();
  }
}(this, function() {
	'use strict';
    
    var instances = [],
        defaults = {
            offset: 0,
            callback: null,
            throttle: 16,
            className: 'is--stuck'
        },
        StormSticky = {
            init: function() {
                this.getTriggerOffset();
				this.throttled = STORM.UTILS.throttle(function(){
					this.check.call(this);
				}.bind(this), this.settings.throttle);
				
				document.addEventListener('scroll', this.throttled, true);
				document.addEventListener('resize', this.throttled, true);
				document.addEventListener('resize', this.getTriggerOffset.bind(this), true);
        		this.check();
            },
            getTriggerOffset: function(){
                var cachedDisplayStyle = this.DOMElement.style.position;

                this.DOMElement.style.position = 'static';
                this.triggerOffset = this.DOMElement.getBoundingClientRect().top + document.body.scrollTop + this.settings.offset;
                this.DOMElement.style.position = cachedDisplayStyle;

            },
			check: function(){
				if (!!this.shouldStick()) {
					this.DOMElement.classList.add(this.settings.className);
					!!this.settings.callback && this.settings.callback.call(this);

					if(!!this.settings.unload) {
						document.removeEventListener('scroll', this.throttled, true);
						document.addEventListener('resize', this.throttled, true);
					}
				} else {
                    !!this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
                }
			},
			shouldStick: function(){
                return window.pageYOffset >= this.triggerOffset;
			}
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Sticky cannot be initialised, no augmentable elements found');
        }
        
        els.forEach(function(el, i){
            instances[i] = Object.assign(Object.create(StormSticky), {
                DOMElement: el,
                settings: Object.assign({}, defaults, opts)
            });
            instances[i].init();
        });
        return instances;
    }
    
    function reload(els, opts) {
        destroy();
        init(els, opts);
    }
    
    function destroy() {
		document.removeEventListener('scroll', self.throttled);
		document.removeEventListener('resize', self.throttled);
        instances = [];  
    }
    
	return {
		init: init,
        reload: reload,
        destroy: destroy
	};
	
 }));