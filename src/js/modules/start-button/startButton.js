import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;



// initialize start button
const startButton = view.element({
	selector: '#start-button',
	// events are based on invokeAction
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
		setStateToRound: function() {
			this.domInstance.innerHTML = 'Next round';
			this.state = 'start-round';
			this.bindEvents(); 
		},
		setStateToGame: function() {
			this.domInstance.innerHTML = 'New game'; 
			this.state = 'start-game';
			this.bindEvents(); 
		},
		AnimationMoveDownOut: function(args, next) {
			animation(this.domInstance, 'move-down-out', function(element) {
				element.style.display = 'none';
				next();
			});
		},
		AnimationMoveUpIn: function(args, next) {
			animation(this.domInstance, function(element, animate) {
				element.style.display = 'block';
				animate();
			}, 'move-up-in', function() {
				next();
			});
		}
	}
});




//
// define actions for button itself
// on action 'start-game' fire toggleState and Animation method
controller.defineActions('start-game', [
	{ exec: startButton.AnimationMoveDownOut, async: true }
]);

// on action 'start-round' fire Animation method
controller.defineActions('start-round', [
	{ exec: startButton.AnimationMoveDownOut, async: true }
]);

// on action changes itself state to 'round' and zoom in button
controller.defineActions('show-round-button', [
	{ exec: startButton.setStateToRound, async: false },
	{ exec: startButton.AnimationMoveUpIn, async: true }
]);

// on action changes itself state to 'game' and zoom in button
controller.defineActions('show-game-button', [
	{ exec: startButton.setStateToGame, async: false },
	{ exec: startButton.AnimationMoveUpIn, async: true }
]);


export default startButton;