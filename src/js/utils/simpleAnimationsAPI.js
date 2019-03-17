import { findClassByString } from './utils.js'

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
	
}


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
// Animations
// - force remove animation class
//

function clearAnimation(element, string) {
	var classes = element.classList,
		toRemove = findClassByString(classes, string);
	
	if (toRemove.length > 0) {
		element.addEventListener('animationstart', function() {
			element.classList.remove(toRemove.join());
			console.log(element.classList);	
		})
	}	
}


export default animation;