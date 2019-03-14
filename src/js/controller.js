class ActionWrapper {
	constructor({name, callbacks, isAsync}) {

	}
}



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
			this.invokeAction(action.name, action)
		} 
	}

	invokeAction(name, callback) {
		const actionId = 
		this._actions[name].forEach(current => current(action));

		if (this.invokeActions)
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



	defineAction(name, definedCb) {
		if (this._actions.hasOwnProperty(name)) {
			this._actions[name].push(callback)	
		} else {
			Object.defineProperty(this._actions, name, {
				value: [callback]
			});
		}
	}

	prepareCallback(callback, actionArgs) {
		return function(next) {
			const cb = callback;
			const args =  actionArgs;
			if(callback.async) {
				cb.exect(args, next);
			} else {
				cb.exect(args);
				next();
			}
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

