"use strict";
var startButton = document.getElementById('game-start'),
	roundDisplay = document.querySelector('.round h1'),
	countdown = document.querySelector('.countdown'),
	circle = document.querySelector('.circle');




onWheelEvent(circle, function(element, direction){
	var icon = element.getElementsByTagName('i')[0];

	if (direction === 'up') {
		animation(icon, 'move-up-out', function(element) {
			setFigure(element, 'up');
		}, 'move-up-in' );
	} else if ( direction === 'down' ) {
		animation(icon, 'move-down-out', function(element) {
			setFigure(element,  'down');
		}, 'move-down-in' );
	}
})




startButton.addEventListener("click", function(event){
	var self = this;

	animation(this, 'move-down-out', function(element) {
		element.style.display = 'none';
		triggerRound();
	});
});


function triggerRound(number) {
	animation(roundDisplay, 'zoom-in','zoom-out', function() {
		countDown();
	});
}

function countDown() {
	animation(countdown, 
		function(element) {
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
	'zoom-in','zoom-out');	
}


//
//  Game engine
//  - 
//

function getWinner() {

}


function 


//
//  Controls
//  - Mouse wheel
//

function onWheelEvent(domObject, callback){
	var element = domObject,
		events = [],
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
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].search(string) === 0) {
			return classes[i];
		}	
	}
}



// Utilities - Figure chooser
// - Set name, icon and value by choosen figure

var pointer = 0;

function setFigure(icon, direction) {
	var circle = icon.parentNode,
		current = circle.getAttribute('data-figure'),
		displayFigure = circle.nextElementSibling.getElementsByTagName('h2')[0],
		figureClass = findClassByString(icon.classList, 'fa-');

		icon.classList.remove(figureClass);

	if ( direction === 'up' && pointer < 2 ){
		pointer += 1;
	} else if ( direction === 'up' && pointer === 2 ) {
		pointer = 0;
	} else if ( direction === 'down' && pointer > 0) {
		pointer -= 1;
	} else if ( direction === 'down' && pointer === 0) {
		pointer = 2;
	}	

	if ( pointer === 1 ) {		
		circle.dataset.figure = 'paper';
		icon.classList.add('fa-hand-paper');
		displayFigure.innerHTML = 'Paper';
	} else if( pointer === 2 ) {
		circle.dataset.figure = 'rock';
		icon.classList.add('fa-hand-rock');
		displayFigure.innerHTML = 'Rock';
	} else if( pointer === 0  ) {	
		circle.dataset.figure = 'scissors';
		icon.classList.add('fa-hand-scissors');
		displayFigure.innerHTML = 'Scissors';
	}
	
}

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