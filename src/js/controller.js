class Controller {
	constructor () {

	}

	prepareAction(type, subscribers) {
		const action = function(event) {
			const self = this;
			const eventType = type;
			const eventSubscribers = subscribers.map(current => {		
				const prepared = function(next) {
					const context = self;
					const eventData = event;
					current(eventData, context, next);
					return next;
				}
				return prepared;
			});
			recursiveFunctionCaller(eventSubscribers);
		}
		return action;
	}

	recursiveFunctionCaller(functionsArray) {
		if (functionsArray.length === 0) return;
		const stack = functionsArray;
		const currentFunction = stack.shift();

		const nextInStack = function() {
			recursiveFunctionCaller(stack);
		}
		//console.log(currentFunction);
		currentFunction(nextInStack);

	}

}

export default Controller;

