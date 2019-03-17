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
			animation(this.domInstance, function(element) {
				element.style.display = 'block';
				//form.addEventListener('submit', onFormSubmit);
			},'zoom-in');
		},
		AnimationZoomOut: function() {
			animation(this.domInstance,'zoom-out', function(element) {
				element.style.display = 'none';
				//form.removeEventListener('submit', onFormSubmit);
			});
		}
	}
})

controller.defineAction('open-modal', { cb: modalWindow.AnimationZoomIn, async: true });
controller.defineAction('close-modal', { cb: modalWindow.AnimationZoomOut, async: true });


export default modalWindow;
