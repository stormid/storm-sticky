import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) console.warn(`Sticky cannot be initialised, cannot find an element matching the selector ${sel}`);

	return els.map(el => Object.assign(Object.create(componentPrototype), {
            DOMElement: el,
            extentNode: opts.extent ? document.querySelector(opts.extent) : false,
			settings: Object.assign({}, defaults, opts)
		}).init());
};

export default { init };