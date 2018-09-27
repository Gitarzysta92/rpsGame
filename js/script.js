"use strict";
var startButton = document.getElementById('game-start'),
	roundDisplay = document.querySelector('.round h1'),
	countdown = document.querySelector('.countdown');



startButton.addEventListener("click", function(event){
	var self = this;

	animation(this, [true, 3], function() {
		triggerRound();
	}, 'move-down-out');



});



function buttonTask(button) {

}


function triggerRound(number) {
	animation(roundDisplay, [true, 3], function() {
		
	}, 'zoom-in','zoom-out');
}

var countdown = function(iterations) {
	var i = 1;
	if (iterations > 0) {
		animation(countdown, [true, 3], function(){
				countdown.innerHTML = i;
				i++
		},'zoom-in','zoom-out');

		return countdown(iterations -1);
		console.log(loop);
	} else {
		return
	}
}



//
// Animations
//

function animation (element, optional, callback, ...animations) {
	var animationsStack = animations.slice(),
		display = optional[0],
		iterations = optional[1],
		callbackStack = [];

	// Prepare functions for callback
	if (display === true) {
		var divDisplay = setDisplay(element, animationsStack);	 
		callbackStack.push(divDisplay);		
	}

	if (typeof callback === 'function') {
		callbackStack.push(callback);	
	}

	if (typeof element === 'object') {

		nextInStack(element, animations, callbackStack);
		//var again = function() {
		//	return	nextInStack(element, animations, callbackStack);
		//}
		//callbackStack.push(again);	
	}
	//console.log(callbackStack);
};	

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


// Iterate over animations stack
function nextInStack(element, animations, callback) {
	var toRemove = animations[0],
		steps = animations,
		limit = 1;

	if (steps[0] === undefined){
		finishAnimation(callback);
		return;
	}
	element.classList.add(steps.shift());
	element.addEventListener("animationend", function() {
		if (limit === 1) {
			nextInStack(element, steps, callback);
			element.classList.remove(toRemove);;
			limit++
		}	
	});
}

function executeStack(stack) {
	for (var i = 0; stack.length > i; i++) {
		// console.log(i, stack[i]);  
    	(stack[i])();
	}
}

function finishAnimation(stack) {
	executeStack(stack);
}

/*



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