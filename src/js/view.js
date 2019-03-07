// Wrapper for dom elements
// handle state and events listeners
class elementWrapper {
	constructor({domElement, events}) {
		this.state = {};
		this._dom = domElement;
		if (events) {
			this.bindEvents(events);
		}
		this._beforeEvent = [];
		this._afterEvent = [];
	}

	bindEvents(events) {
		events.forEach(current => this.addEvent(current));
	}

	addEvent(event) {
		const cb = this.bindHooks(event);
		this._dom.addEventListener(event.type, cb);
	}

	bindHooks({name, type, callback}) {
		return function(event) {
			const wrapped = callback.bind(this);
			const firstHook = this.activateHooks(this._beforeEvent, {name, type});
			if (!firstHook) return;
			wrapped(event);
			
		}
	}

	activateHooks() {
		this._beforeEvent.forEach(current =>  )
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
	}

	bindElement(id, {events}) {
		const element = this._rootElement.querySelector(id);
		if (!element && events.length == 0) {
			// throw error;
			return;
		}

		const wrappedElement = new elementWrapper({
			domElement: element,
			events: events.map(current => Object.defineProperties(current, {
					callback: {
						value: this.prepareAction(current.subscribers)
					} 
				})	
			)	
		})
		this._viewElements.push(wrappedElement);
		return wrappedElement;
	}

	prepareAction(subscribers) {
		const action = function(event) {
			const self = this;
			const eventData = event;
			subscribers.forEach(current => current(eventData, self));
		}
		return action;
	}

}


export default View;

