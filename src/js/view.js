// Wrapper for dom elements
// handle state and events listeners
class ElementWrapper {
	constructor({selector, events, customProperties}, callback, root) {
		this._dom = root.querySelector(selector) || null;
		this._callback = callback;
		this._events = events;
		this.setProperties(customProperties);
		this.bindEvents();
	
	}
	// TO DO:
	// Add support for conditional events
	prepareAction(subscribers) {
		const action = function(event) {
			const self = this;
			const eventData = event;
			subscribers.forEach(current => current(eventData, self));
		}
		return action;
	}

	setProperties(props) {
		const propsKeys = Object.keys(props);
		propsKeys.forEach(current => {
			if (typeof props[current] === 'function') {
				this[current] = props[current].bind(this);	
			} else {
				this[current] = props[current]
			}	
		});
	}
	// TO DO
	// implement events listeners redeclaration
	bindEvents() {
		this._events.forEach(current => this.addEvent(current));
	}

	addEvent(event) {
		if (this.checkCondition(event.condition)) {
			this._dom.addEventListener(event.type, (e) => {
				
						this._callback({
						wrapper: this, 
						event: {
							name: event.name,
							type: event.type,
							data: e
						}
					});
			});
		} else {

		}
	}
	// TO DO
	// it must be refactored
	checkCondition(conditionFunction) {
		const cFunc = conditionFunction;
		if (!cFunc) {
			// throw err
			return;
		}
		const condition = cFunc.bind(this);
		return condition();
	}

	get domInstance() {
		return this._dom;
	}
}



// Container for UI elements
// Provide subscription 
class View {
	constructor(domAppContainer) {
		this._rootElement = domAppContainer;
		this._viewElements = [];
		this._subscribers = [];
		this._capturedEvents = [];
	}

	captureEvent({wrapper, event}) {
		const prepared = this.prepareEntry({wrapper, event});
		this._capturedEvents.push(prepared);
		this._notifySubscribers(prepared);
	}

	prepareEntry({wrapper, event}) {
		const entry = {
			data: event.data,
			name: event.name,
			type: event.type,
			wrapper: wrapper,
			captureTime: new Date() 
		}
		return entry;
	}

	_notifySubscribers(preparedEvent) {
		this._subscribers.forEach(current => current(preparedEvent));
	}

	register(element) {
		this._viewElements.push(element);
		return element;
	}

	subscribe(subscriber) {
		this._subscribers.push(subscriber);	
	}
}


class ViewFactory {
	constructor(rootElement) {
		this.rootElement = rootElement;
		this.model = this.init();
	}
	init() { 
		return new View(this.rootElement);
	}

	element(setup) {
		const newElement = new ElementWrapper(setup, this.model.captureEvent.bind(this.model), this.rootElement);	
		return this.model.register(newElement); 
	}

	get function() {
		return this.model;
	}
}



export default ViewFactory;

