// Wrapper for dom elements
// handle state and events listeners
class ElementWrapper {
	constructor({selector, events, customProperties = {}}, callback, root) {
		this._dom = root.querySelector(selector) || null;
		this._callback = callback;
		this._events = {};
		this.setProperties(customProperties);
		this.addEvents(events);
		this.bindEvents();
	
	}

	// Add object custom properties
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

	// Add defined events.
	// argument type: array
	addEvents(events) {
		events.forEach(current => this.addEvent(current));
	}

	// Add single event
	// argument type: object
	// argument props: name:string, type:string, condition:function(optional)
	addEvent(event) {
		Object.defineProperty(this._events, event.name, {
			value: {
				type: event.type,
				data: this.prepareListenerCallback(event),
				condition: event.condition
			},
			enumerable: true,
			writable: false
		});	
	}

	// Set events listeners for each defined event 
	// if it condition passed
	bindEvents() {
		for (let current in this._events){
			const event = this._events[current]	
			if (this.checkCondition(event.condition)) {
				this._dom.addEventListener(event.type, event.data);
			} else {
				this._dom.removeEventListener(event.type, event.data);
			}
		}
	}

	// Prepare listener callback for defined events
	prepareListenerCallback(event) {
		const listenerCallback = (e) => {
			this._callback({
				wrapper: this, 
				event: {
					name: event.name,
					type: event.type,
					data: e
				}
			});
		};
		return listenerCallback;
	}

	// TO DO
	// it must be refactored
	// ---
	// Check is particular event have a condition
	checkCondition(conditionFunction) {
		const cFunc = conditionFunction;
		if (cFunc === undefined) {
			// throw err
			return true;
		}
		const condition = cFunc.bind(this);
		return condition();
	}

	// return dom element
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

	// Callback for capturing given element event
	captureEvent({wrapper, event}) {
		const prepared = this.prepareEntry({wrapper, event});
		this._capturedEvents.push(prepared);
		this._notifySubscribers(prepared);
	}

	// Prepare event entry for captured events registry
	prepareEntry({wrapper, event}) {
		const entry = {
			data: event.data,
			name: event.name,
			type: event.type,
			element: wrapper,
			captureTime: new Date() 
		}
		return entry;
	}

	// Notify subscribers when event has occur
	_notifySubscribers(preparedEvent) {
		this._subscribers.forEach(current => current(preparedEvent));
	}

	// Add single dom element 
	register(element) {
		this._viewElements.push(element);
		return element;
	}

	// Add subscribers to notify
	subscribe(subscriber) {
		this._subscribers.push(subscriber);	
	}
}


// Factory Class binding view 
// with element wrapper
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

