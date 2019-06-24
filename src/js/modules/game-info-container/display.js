import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;


// initialize modal window
const display = view.element({
	selector: '.countdown',
	customProperties: {
		countDown: function(callback, next) {
			animation(this.domInstance, 
				function(element, animate) {
					element.style.fontSize = '120px';
					element.innerHTML = '3';
					element.style.display = 'block';
					animate();
			}, 
			'zoom-in','zoom-out', 
				function(element, animate) {
					element.innerHTML = '2';
					animate();
			},
			'zoom-in','zoom-out',
				function(element, animate) {
					element.innerHTML = '1';
					animate();
			},
			'zoom-in', 'zoom-out',
				function(element) {
					element.innerHTML = '';
					element.style.display = 'none';
					callback();
					next();	
			});	
		},
		showResult: function(text, next) {
			animation(this.domInstance, 
				function(element, animate) {
					element.style.fontSize = '80px';
					element.innerHTML = text;
					element.style.display = 'block';
					animate();
			}, 'zoom-in', 
				function(element, animate) {
					setTimeout(function() {
						animate();
					}, 1000)
			}, 'zoom-out',
				function(element) {
					element.style.display = 'none';
					next();
			});	
		},
		showRoundNumber: function(message, next) {
			animation(this.domInstance, 
				function(element, animate) {
					element.style.fontSize = '60px';
					element.innerHTML = message;
					element.style.display = 'block';
					animate();
			}, 'zoom-in', 
				function() {
					next();
			});
		},
		hide: function(noop, next) {
			animation(this.domInstance, 
				function(element, animate) {
					animate();
			}, 'zoom-out', 
				function(element) {
					element.style.display = 'none';
					next();
			})
		}
	}
})

controller.defineAction('start-countdown', { exec: display.countDown, async: true });
controller.defineAction('show-result', { exec: display.showResult, async: true });


controller.defineActions('present-round-number', [
	{ exec: display.showRoundNumber, async: true },
	{ exec: display.hide, async: true }
]);

controller.defineAction('show-center-message', { exec: display.showRoundNumber, async: true } );
controller.defineAction('hide-center-message', { exec: display.hide, async: true });




export default display;
