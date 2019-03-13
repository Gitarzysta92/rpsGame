class Controller {
	constructor () {
		this._actions = {};
		this.invokedActions = [];
	}

	get function() {
		return this.actionHandler;	
	}
	

	eventHandler = (action) => {
		if (!this._actions.hasOwnProperty(action.name)) {
			new Error('Given event have no handling Action')
			return;	
		} else {
			this._actions[action.name].forEach(current => current(action));
		} 
	}

	defineActions(name, callbacks) {
		if (!Array.isArray(callbacks)) {
			//throw error
			return;
		} else {
			callbacks.forEach(current => {
				this.defineAction(name, current);
			});
		}
	}


	defineAction(name, callback) {
		if (this._actions.hasOwnProperty(name)) {
			this._actions[name].push(callback)	
		} else {
			Object.defineProperty(this._actions, name, {
				value: [callback]
			});
		}
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

