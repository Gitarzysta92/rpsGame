import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation, onWheelEvent } = utils;


// initialize modal window
const figureCircle = view.element({
	selector: '.circle',
	customProperties: {
		isListen: false,
		icon: this.domInstance.getElementsByTagName('i')[0],
		toggleListener: function() {
			if (isListnen) {
				onWheelEvent(circle, eventDirection);
				window.onkeyup = onKeyboardEvent;	
			} else {
				onWheelEvent(circle, eventDirection, 'remove');
				window.onkeyup = null;
			}
		},
		rollUp: function() {
			animation(this.icon, 'move-up-out', function(element) {
				controlsFigure(element, 'up');
			}, 'move-up-in' );
		},
		rollDown: function() {
			animation(icon, 'move-down-out', function(element) {
				controlsFigure(element,  'down');
			}, 'move-down-in' );
		},

	}
})


//
//  Controls
//  - wheel event controls
//
function onKeyboardEvent(e) {
    var key = event.keyCode ? event.keyCode : event.which;
    if (key == 87) {
     	eventDirection(circle, 'up');
    }else if (key == 83) {
     	eventDirection(circle, 'down');
    }
    
}


//
// Utilities - Figure chooser
// - Set name, icon and value by choosen figure
//
var pointer = 0;
function controlsFigure(icon, direction) {
	if ( direction === 'up' && pointer < 2 ){
		pointer += 1;
	} else if ( direction === 'up' && pointer === 2 ) {
		pointer = 0;
	} else if ( direction === 'down' && pointer > 0) {
		pointer -= 1;
	} else if ( direction === 'down' && pointer === 0) {
		pointer = 2;
	}
	setFigure(icon, pointer);
}
//
// Utilities - Figure setter
// - Set name, icon and value by choosen figure
//
function setFigure(icon, figureNumber) {
	var circle = icon.parentNode,
		current = circle.getAttribute('data-figure'),
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
//
// Utilities - Figure getter
// - get figure by player id
//
function getFigure(playerId) {
	var element = document.getElementById(playerId);
	return element.querySelector('.circle').dataset.figure;
}
function removeFigureClass(icon) {
	var figureClass = findClassByString(icon.classList, 'fa-');
	icon.classList.remove(figureClass.join());	
}
*/