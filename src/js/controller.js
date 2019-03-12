class Controller {
	constructor () {
		this._actions = {};
		this.invokedActions = [];
	}

	get function() {
		return this.actionHandler;	
	}
	

	actionHandler = (action) => {
		this._actions[action.name](action);
	}

	defineAction({name, callback}) {
		Object.defineProperty(this._actions, name, {
			value: callback
		});
	}

	
	recursiveFunctionCaller(functionsArray) {
		if (functionsArray.length === 0) return;
		const stack = functionsArray;
		const currentFunction = stack.shift();

		const nextInStack = function() {
			this.recursiveFunctionCaller(stack);
		}
		//console.log(currentFunction);
		currentFunction(nextInStack);

	}

}

export default Controller;

