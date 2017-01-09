import Sticky from './libs/storm-sticky';

const onDOMContentLoadedTasks = [() => {
	let sticky = Sticky.init('.js-sticky');
	console.log(sticky);
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });