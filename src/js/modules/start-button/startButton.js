import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;



// initialize start button
const startButton = view.element({
	selector: '#start-button',
	events: [
		{	
			name: 'new-game',
			type: "click",
			condition: function() { 
				return this.state === 'start-game'; 
			}
		},
		{	
			name: 'start-round',
			type: "click",
			condition: function() { 
				return this.state === 'start-round'; 
			}

		}
	],
	customProperties: {
		state: 'start-game',
		toggleState: function() {this.state === 'start-game' ? 
			this.state = 'start-round' : this.state = 'start-game';
			this.domInstance.innerHTML = 'Next round';
			this.bindEvents();
		},
		AnimationMoveDownOut: function({ element }, callback) {
			animation(this.domInstance, 'move-down-out', function(element) {
				element.style.display = 'none';
				callback();
			});
		}
	}
});

controller.defineActions('start-game', [
	{ cb: startButton.toggleState, async: false },
	{ cb: startButton.AnimationMoveDownOut, async: true }
]);
controller.defineActions('start-round', [
	{ cb: startButton.toggleState, async: true }
]);


export default startButton;