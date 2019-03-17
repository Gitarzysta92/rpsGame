

class App {
	constructor() {
		this.servicesRegistry = {};
	}

	register({collection, name, base}) {
		this.addCollection(collection);
		Object.defineProperty(this.servicesRegistry[collection], name, {
			value: base,
			writable: false
		});
	}

	addCollection(collectionName) {
		if (!this.servicesRegistry.hasOwnProperty(collectionName)) {
			Object.defineProperty(this.servicesRegistry, collectionName, {
				value: {},
				writable: true
			})
		}
	}

	get services() {
		return Object.freeze(this.servicesRegistry);
	}
}

export default App