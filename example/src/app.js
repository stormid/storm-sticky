import Sticky from './libs/storm-sticky';

const onDOMContentLoadedTasks = [() => {
	Sticky.init('.js-sticky');
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });