import { core, utils } from '../../app.js';

const { controller, view } = core;
const { 
	animation, 
	onWheelEvent,
	onTouchEvent,
	findClassByString 
} = utils;


// TO DO:
// Refactor this elements 


const cpuCircle = view.element({
	selector: '#cpu .circle',
	customProperties: {
		setFigure: function(number) {
			const icon = this.domInstance.getElementsByTagName('i')[0]
			setFigure(icon, number);
		},
		blinkCircle() {
			animation(this.domInstance, 'blink', function() {
			})
		},
	}
})


controller.defineAction('cpu-set-figure', {exec: cpuCircle.setFigure, async: false});
controller.defineAction('cpu-blink-circle', {exec: cpuCircle.blinkCircle, async: false});


// initialize modal window
const playerCircle = view.element({
	selector: '#human .circle',
	customProperties: {
		figurePointer: 0,
		icon: {},
		getPointer: function(setFigure) {
			setFigure(this.figurePointer);
		},
		isListen: function(listen) {
			this.icon = this.domInstance.getElementsByTagName('i')[0];
			if (listen) {
				onWheelEvent(this.domInstance, this.eventDirection);
				window.onkeyup = this.onKeyboardEvent;
				this.onTouchEvent(true);
			} else {
				onWheelEvent(this.domInstance, this.eventDirection, 'remove');
				window.onkeyup = null;
				this.onTouchEvent(false);
			}
		},
		eventDirection: function(direction) {
				if (direction === 'up') {
					this.rollUp();
				} else {
					this.rollDown();
				}
		},
		rollUp: function() {
			const moveFigure = this.controlsFigure.bind(this); 
			animation(this.icon, 'move-up-out', function(element, animate) {
				moveFigure(element, 'up');
				animate();
			}, 'move-up-in' );
		},
		rollDown: function() {
			const moveFigure = this.controlsFigure.bind(this); 
			animation(this.icon, 'move-down-out', function(element, animate) {
				moveFigure(element,  'down');
				animate();
			}, 'move-down-in' );
		},
		blinkCircle() {
			animation(this.domInstance, 'blink', function() {
			})
		},
		controlsFigure: function(icon, direction) {
			if ( direction === 'up' && this.figurePointer < 2 ){
				this.figurePointer += 1;
			} else if ( direction === 'up' && this.figurePointer === 2 ) {
				this.figurePointer = 0;
			} else if ( direction === 'down' && this.figurePointer > 0) {
				this.figurePointer -= 1;
			} else if ( direction === 'down' && this.figurePointer === 0) {
				this.figurePointer = 2;
			}
			setFigure(this.icon, this.figurePointer);
		},
		onKeyboardEvent: function(event) {
			var key = event.keyCode ? event.keyCode : event.which;
			if (key == 87) {
				this.eventDirection(this.domInstance, 'up');
			}else if (key == 83) {
				this.eventDirection(this.domInstance, 'down');
			}	
		},	
		onTouchEvent: function() {
			const self = this;
			onTouchEvent(this.domInstance, function(direction) {
				self.eventDirection(direction);
			})
		}
	}
})

controller.defineAction('human-get-figure', { exec: playerCircle.getPointer, async: false });
controller.defineAction('human-blink-circle', {exec: playerCircle.blinkCircle, async: false});


playerCircle.isListen(true);

//
// Utilities - Figure setter
// - Set name, icon and value by choosen figure
//
function setFigure(icon, figureNumber) {
	var circle = icon.parentNode,
		displayFigure = circle.nextElementSibling.getElementsByTagName('h2')[0];
		removeFigureClass(icon);

	
	if ( figureNumber === 1 ) {	
		circle.dataset.figure = 'paper';
		icon.classList.add('fa-hand-paper');
		displayFigure.innerHTML = 'Paper';

	} else if( figureNumber === 2 ) {
		circle.dataset.figure = 'rock';
		icon.classList.add('fa-hand-rock');
		displayFigure.innerHTML = 'Rock';
	} else if( figureNumber === 0  ) {
		circle.dataset.figure = 'scissors';
		icon.classList.add('fa-hand-scissors');
		displayFigure.innerHTML = 'Scissors';
	}
}

function removeFigureClass(icon) {
	var figureClass = findClassByString(icon.classList, 'fa-');
	icon.classList.remove(figureClass.join());	
}

