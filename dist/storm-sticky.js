/**
 * @name storm-sticky: 
 * @version 0.1.0: Fri, 20 Jan 2017 16:50:22 GMT
 * @author stormid
 * @license MIT
 */
import throttle from 'lodash/throttle';

const defaults = {
		offset: 0,
		callback: false,
		unload: true,
		throttle: 16,
		className: 'is--stuck'
	},
	StormSticky = {
		init() {
			this.getTriggerOffset();
			this.throttled = throttle(() => {
				this.check.call(this);
			}, this.settings.throttle);
			
			document.addEventListener('scroll', this.throttled);
			document.addEventListener('resize', this.throttled);
			document.addEventListener('resize', this.getTriggerOffset.bind(this));
			this.check();

			return this;
		},
		getTriggerOffset(){
			let cachedDisplayStyle = this.DOMElement.style.position;

			this.DOMElement.style.position = 'static';
			this.triggerOffset = this.DOMElement.getBoundingClientRect().top + (document.body.scrollTop || ~~document.body.scrollTop) + this.settings.offset;
			this.DOMElement.style.position = cachedDisplayStyle;
		},
		check(){
			if (!this.shouldStick()) {
				this.DOMElement.classList.contains(this.settings.className) && this.DOMElement.classList.remove(this.settings.className);
				return;
			}
			this.DOMElement.classList.add(this.settings.className);
			this.settings.callback && this.settings.callback.call(this);
			
			if(this.settings.unload) {
				document.removeEventListener('scroll', this.throttled, true);
				document.removeEventListener('resize', this.throttled, true);
			}
		},
		shouldStick(){
			return window.pageYOffset >= this.triggerOffset;
		}
	};
    
const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) throw new Error('Sticky cannot be initialised, no augmentable elements found');

	return els.map((el) => {
		return Object.assign(Object.create(StormSticky), {
			DOMElement: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };