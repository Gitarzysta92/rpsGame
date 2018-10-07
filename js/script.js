"use strict";
var startButton = document.getElementById('round'),
	roundDisplay = document.querySelector('.round h1'),
	countdown = document.querySelector('.countdown'),
	circle = document.querySelector('.circle'),
	modal = document.querySelector('.modal');

var form = document.getElementById("form"),
 	data = document.getElementsByClassName("data");

startButton.addEventListener("click", function(event){
	var self = this;

	if ( event.target.dataset.game === 'new-game' ) {
		animation(this, 'move-down-out', function(element) {
			element.style.display = 'none';
		});
		animation(modal, function(element) {
			element.style.display = 'flex';
			form.addEventListener('submit', onFormSubmit);
		},'zoom-in');
	} else if ( event.target.dataset.game === 'play-game' ) {
		animation(this, 'move-down-out', function(element) {
			element.style.display = 'none';
			triggerRound();
		});
		controlsStatus('on');
	}	
});


//
//  User Interface
//  - moves history
//

function onFormSubmit(e) {
	e.preventDefault();
	setGame(data);

	playerName('player-1', gameSettings[0]);
	
	startButton.dataset.game = 'play-game';
	startButton.innerHTML = 'Next round';
	roundDisplay.innerHTML = 'Round 1';
	animation(modal, 'zoom-out', function(element) {
			element.style.display = 'none';
			controlsStatus('on');
			triggerRound();
			clearList();
	});
}



function triggerRound() {
	animation(roundDisplay, function(element){
		element.style.display = 'block';
	}, 'zoom-in', 'zoom-out', function(element) {
		countDown();
	});
}

function countDown() {
	animation(countdown, 
		function(element) {
			element.style.fontSize = '120px';
			element.innerHTML = '3';
			element.style.display = 'block';
	}, 
	'zoom-in','zoom-out', 
		function(element) {
			element.innerHTML = '2';
	},
	'zoom-in','zoom-out',
		function(element) {
			element.innerHTML = '1';
	},
	'zoom-in','zoom-out',
		function(element) {
			element.style.fontSize = '80px';
			element.innerHTML = getWinner(figures.indexOf(getFigure('player-1')));		
	});	
}

function blinkWinner(winnerFigure) {
	var winner = document.querySelectorAll('[data-figure="' + winnerFigure + '"]');

	if (winner.length === 1) {
		animation(winner[0], 'blink', function() {
			nextRound();
			updateList(winner[0].parentNode);
		});
	} else {
		setTimeout(function(){
			nextRound();
			updateList();
		}, 2400);
	}
}


function nextRound() {
	animation(countdown, 'zoom-out', function(element){
		element.style.display = 'none';
		

		if (rounds.length >= parseInt(gameSettings[1], 10)) {
			
			roundDisplay.innerHTML = 'Start new game';
			rounds.splice(0, rounds.length);
			gameSettings.splice(0, gameSettings.length);
			startButton.innerHTML = 'New game';
			console.log(rounds.length, gameSettings);

			animation(startButton, function(element) {
				startButton.dataset.game = 'new-game';
				element.style.display = 'block';
			},'move-up-in');
		} else {
			console.log(rounds.length, parseInt(gameSettings[1], 10));
			roundDisplay.innerHTML = 'Round ' + (rounds.length + 1);
			animation(startButton, function(element) {
				element.style.display = 'block';
			},'move-up-in');	
		}
	});

		
}


//
//  Game engine
//  - 
//

var figures = ['scissors', 'paper', 'rock'],
	rounds = [],
	gameSettings = [];


function getWinner(playerFigure) {
	var player = playerFigure,
		oponent = oponentFigure();

	controlsStatus('off');

	if ( player === oponent - 1 || player === 2 && oponent === 0 ){
		blinkWinner(figures[player]);
		rounds.push('player');
		return 'You win';
	} else if ( player === oponent) {
		blinkWinner(figures[player]);
		rounds.push('draw');
		return 'Draw';
	} else {
		blinkWinner(figures[oponent]);
		rounds.push('cpu');
		return 'You lost';
	}
}

function gameWinner() {

}

function oponentFigure() {
	var number = Math.floor(Math.random() * 3),
		oponent = document.getElementById('player-2').getElementsByTagName('i')[0];;

	setFigure(oponent, number);
	return number;
}

function setGame(formData) {
	var data = formData;
  	for (var i = 0; i < data.length; i++) {
    	gameSettings.push(data[i].value);
  	}
}


//
//  User Interface
//  - moves history
//

function updateList(winner) {
	var player = [].slice.call(document.querySelectorAll('.player')),
		index = player.indexOf(winner);

	
	if (index > -1) {
  		player.splice(index, 1);
  		player.unshift(winner);
	}

	for (var i = 0; i < player.length; i++) {
		var figuresList = document.querySelector('#' + player[i].id + ' .latest-moves ul'),
			figure = document.createElement('li'),
			nodes = figuresList.getElementsByTagName('li');

		if ( i === 0 && index > -1 ) {
			figure.classList.add('win');
		}
		figure.innerHTML = '<i class="far fa-hand-' + getFigure(player[i].id) + '"></i>';

		if ( nodes.length === 3 ) {
			figuresList.removeChild(nodes[2]);
		}	
		figuresList.insertBefore(figure, figuresList.firstChild).style.display = 'none';
		animation(figure, function() {
			figure.style.display = 'flex';
			//nodes[1].classList.remove('win');
		},'zoom-in');
	}
}

function clearList() {
	var figuresList = document.querySelectorAll('.latest-moves ul');

	for (var i = 0; i < figuresList.length; i++) {
		while (figuresList[i].firstChild) {
    		figuresList[i].removeChild(figuresList[i].firstChild);
		}
		
	}
	console.log(figuresList);
}



function playerName(player, nameString) {
	var nameElement = document.querySelector('#' + player + ' span');

	nameElement.innerHTML = nameString;
}

//
//  Controls
//  - check is controls needed
//

function controlsStatus(status) {
	circle = document.querySelector('.circle');

	if (status === 'on') {
		onWheelEvent(circle, eventDirection);	
	} else if (status === 'off') {
		onWheelEvent(circle, eventDirection, 'remove');
	}
}


function eventDirection(element, direction){
	var icon = element.getElementsByTagName('i')[0];

	if (direction === 'up') {
		animation(icon, 'move-up-out', function(element) {
			controlsFigure(element, 'up');
		}, 'move-up-in' );
	} else if ( direction === 'down' ) {
		animation(icon, 'move-down-out', function(element) {
			controlsFigure(element,  'down');
		}, 'move-down-in' );
	}
}


//
//  Controls
//  - wheel event controls
//

function onWheelEvent(domObject, callback){
	var element = domObject,
	 	args = [].slice.call(arguments)

	if (args.indexOf('remove') > -1) {
		// element.removeEventListener('wheel', wheelEventHandler);
		var clone = element.cloneNode(true);

		element.parentNode.replaceChild(clone, element);
  		return;
	}
	console.log('add');
	var events = [],
		threshold = 300;
		
	element.addEventListener('wheel', wheelEventHandler);

	function wheelEventHandler(event) {
		var eventTime = event.timeStamp.toFixed(0),
			direction = '';

			if ( event.deltaY > 0 ) {
				direction = 'down'; 
			} else {
				direction = 'up';
			}

			events.push(eventTime);

			if ( eventActivity(eventTime) === true ) {
				callback(element, direction);	
			}	
	}

	function eventActivity(time) {
		var latestEvent = parseInt(events[events.length - 2], 10) + threshold || parseInt(events[events.length - 1], 10) - 100,
			currentEvent = parseInt(events[events.length - 1], 10);
		
		if ( latestEvent < currentEvent ) {
			events.splice(0, events.length - 1);
			return true;		
		} else {
			return false;
		}	
	}
}


//
// Animations
// - 
//

function animation (element, ...steps) {
	var self = element;
	if (!element) { 
		return; 
	}	
	nextInStack(self, steps, function(){
		//console.log('end');	
	});	
	
};	


// Iterate over animations stack
function nextInStack(element, toDo, callback) {
	var stack = toDo,
		toRemove = stack[0],
		limiter = 1;
	
	if (typeof stack[0] === 'function'){
		(stack.shift())(element);
		nextInStack(element, stack, callback);
	} else if (typeof stack[0] === 'string') {
		element.classList.add(stack.shift());
		element.addEventListener("animationend", function() {
			if (limiter === 1) {
				element.classList.remove(toRemove);
				limiter++
				nextInStack(element, stack, callback);
			}	
		});
	} else {
		callback();
		return;
	}
}


//
// Utilities - Class Finder
// - find class by part of it name
//


function findClassByString(classes, string) {
	var found = [];
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].search(string) === 0) {
			found.push(classes[i]);	
		}	
	}
	return found;
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

//
// Utilities - Figure getter
// - get figure by player id
//



/*




// Additional options for animation
// Set display of animated element, based on last animation type
function setDisplay(element, animations) {
	var s = animations,
		first = firstAnimation(s),
		last = lastAnimation(s);
		

		if (animations.length <= 1 && first === last && first === 'in' ) {
			element.style.display = display(first);
		} else if ( animations.length <= 1 && first === last && first === 'out' ){
			var divDisplay = function() { 
				element.style.display = display(last);
			};
			return divDisplay;	
		} else if ( animations.length > 1) {
			element.style.display = display(first);
			var divDisplay = function() { 
				element.style.display = display(last);
			};
			return divDisplay;
		}
}


function firstAnimation(animations) {
	var firstAnimation = animations[0],
		first = firstAnimation.split("-");
		first = first[first.length -1];

		return first;
}

function lastAnimation(animations) {
	var lastAnimation = animations[animations.length -1],
		last = lastAnimation.split("-");
		last = last[last.length -1];
		
		return last;
}

function display(type) {
	if (type === 'in'){
		return  "block";
	} else if (type === 'out') {
		return "none";
	}	
}

function fadeIn (element, callback) {
	if (typeof element === 'object') {
		var self = element;
		element.classList.add('zoom-in');
		console.log(self, this);
		
	}
	console.log(typeof element)
	self.addEventListener("animationend", function() {
		if (typeof callback === 'function') {
			var element = self; 
			self.classList.add('zoom-in');
			callback(element, callback);
			console.log('Tutaj z callbackiem ', callback);
		} else {
			return;
		}
	});
}

*/





