
class Controller {
	constructor () {
		this._actions = {};
		this._invokedActions = {
			async: [],
			sync: []
		};
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
		if (!action.hasOwnProperty('exec')) {
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

	removeAction(name) {
		console.log(this._actions[name])
		delete this._actions[name];
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
		}	
		this.stageAction(name, callback);
	}

	stageAction(name, callback) {
		this._actions[name].forEach(current => {
			const action = this.prepareFunc(name, current, callback);
	
			if (current.async) {
				this._invokedActions.async.push(action);
				if (this._invokedActions.async.length <= 1) {	
					this.recursiveFunctionCaller(this._invokedActions.async);
				}
			} else {
				this._invokedActions.sync.push(action);
				if (this._invokedActions.sync.length <= 1) {	
					this.recursiveFunctionCaller(this._invokedActions.sync);
				}
			}
		});
	}

	// wrap action function and pass function caller as argument 
	// accepts -> functionWrapper:object, actionArgs: function/object
	prepareFunc(name, functionWrapper, actionArgs) {
		const logAction = this.actionLogger
		const action = functionWrapper;
		const args =  actionArgs;

		const exec = function(next) {
			logAction(name, functionWrapper.async, functionWrapper.exec);

			if(functionWrapper.async) {
				action.exec(args, next);
			} else {
				action.exec(args);
				next();
			}
		}

		Object.defineProperty(exec, 'name', {
			value: name
		})

		return exec;
	}

	// Walks on given array and call Action functions
	// accepts -> functionsArray:array
	recursiveFunctionCaller(functionsArray) {
		if (functionsArray.length === 0) return;
		const stack = functionsArray;
		const currentFunction = stack[0];

		const nextInStack = () => {
			this.archivizeAction(stack.shift());
			this.recursiveFunctionCaller(stack);
		}
		currentFunction(nextInStack);

	}

	actionLogger(actionName, type, func) {
		console.log('invoked action: ' + actionName + ' -async: ' + type + ' ' + func.name);
	}

	archivizeAction(action) {
		this._actionsArchive.push({
			name: action.name,
			action: action
		});
		//console.log(this._actionsArchive);
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

