import Load from 'storm-load';

const onDOMContentLoadedTasks = [() => {

	Load('./js/storm-sticky.standalone.js')
		.then(() => {
			let Sticky = StormSticky.init('.js-sticky', { extent: '.js-scroll__extent' });
			console.log(Sticky);
		});
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });