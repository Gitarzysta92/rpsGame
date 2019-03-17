
class Controller {
	constructor () {
		this._actions = {};
		this.invokedActions = [];
		this._actionsArchive = [];
		this.apiWrapper();
	}

	// Call action by given name
	// accepts -> name:string, callback:function
	defineActions(name, callbacks) {
		if (!Array.isArray(callbacks)) {
			throw new Error('Given callbacks argument is not Array type');
		} else {
			callbacks.forEach(current => {
				this.defineAction(name, current);
			});
		}
	}

	// Call action by given name
	// accepts -> name:string, action:object
	defineAction(name, action) {
		if (!action.hasOwnProperty('cb')) {
			throw new Error('Incorrect defined action: ' + name);
		}
		if (this._actions.hasOwnProperty(name)) {
			this._actions[name].push(action)	
		} else {
			Object.defineProperty(this._actions, name, {
				value: [action]
			});
		}
	}
	
	// Subscriber callback for given Actions emmited by View
	// accepts -> event:object handling event result
	// 
	eventHandler = (event) => {
			this.invokeAction(event.name, event);
	}

	// Add action by given name to staged stack
	// accepts -> name:string, callback:function/object
	invokeAction(name, callback) {
		if (!this._actions.hasOwnProperty(name)) {
			throw new Error('Given event have no handling Action: ' + name);
		} else {
			if (this.invokedActions.length === 0) {
				this.stageAction(name, callback);
				this.recursiveFunctionCaller(this.invokedActions);
			} else {
				this.stageAction(name, callback);
			}
		} 
	}

	stageAction(name, callback) {
		this._actions[name].forEach(current => {
			const action = this.prepareFunc(name, current, callback);
			this.invokedActions.push(action);
		});
	}

	// wrap action function and pass function caller as argument 
	// accepts -> functionWrapper:object, actionArgs: function/object
	prepareFunc(name, functionWrapper, actionArgs) {
		const logAction = this.actionLogger
		const action = functionWrapper;
		const args =  actionArgs;

		return function(next) {
			logAction(name, functionWrapper.async, functionWrapper.cb);

			if(functionWrapper.async) {
				action.cb(args, next);
			} else {
				action.cb(args);
				next();
			}
		}
	}

	// Walks on given array and call Action functions
	// accepts -> functionsArray:array
	recursiveFunctionCaller(functionsArray) {
		if (functionsArray.length === 0) return;
		const stack = functionsArray;
		const currentFunction = stack.shift();

		const nextInStack = () => {
			this.recursiveFunctionCaller(stack);
		}
		currentFunction(nextInStack);

	}

	actionLogger(actionName, type, func) {
		console.log('invoked action: ' + actionName + ' -async: ' + type + ' ' + func.name);
	}



	//
	//
	apiWrapper() {
		let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
		props = props.filter(current => typeof this[current] === 'function' && current !== 'constructor');
		props.forEach(property => {
			const ownProperty = this[property];
			const privateProperty = '_' + property;
			const funcWrapper = (...args) => {
				try {
					return this[privateProperty].apply(this, args);	
				} 
				catch(error) {
					console.log(error);
				}
			}
			Object.defineProperty(this, privateProperty, {
				value: ownProperty,
				enumerable: false,
				configurable: false,
				writable: false
			});
			Object.defineProperty(this, property, { value: funcWrapper });
		})
	} 

}

export default Controller;

