import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;


// initialize modal window
const modalWindow = view.element({
	selector: '#modal',
	events: [
		{
			name: 'close-modal',
			type: 'click',
			selector: '.close-modal'
		}
	],
	customProperties: {
		AnimationZoomIn: function() {
			animation(this.domInstance, function(element, animate) {
				element.style.display = 'block';
				//form.addEventListener('submit', onFormSubmit);
				animate();
			},'zoom-in');
		},
		AnimationZoomOut: function(arg, next) {
			animation(this.domInstance,'zoom-out', function(element) {
				element.style.display = 'none';
				next()
			});
		}
	}
})

controller.defineAction('open-modal', { exec: modalWindow.AnimationZoomIn, async: false });
controller.defineAction('close-modal', { exec: modalWindow.AnimationZoomOut, async: true });


export default modalWindow;
