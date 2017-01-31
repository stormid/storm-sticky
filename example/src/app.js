import Load from 'storm-load';

const onDOMContentLoadedTasks = [() => {

	Load('./js/storm-sticky.standalone.js')
		.then(() => {
			StormSticky.init('.js-sticky');
		});
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });