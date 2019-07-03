// import main services container
import AppContainer from './lib/appContainer.js';

// import major services
import Controller from './lib/controller.js';
import View from './lib/view.js';

// import utilities
import animation from './utils/simpleAnimationsAPI.js';
import wheelEvent from './utils/wheelEvents.js';
import touchEvent from './utils/touchEvents.js';
import * as generalUtils from './utils/utils.js';


const app = new AppContainer();
const gameContainer = document.getElementById('rps');
const view = new View(gameContainer);
const controller = new Controller();
 
view.model.subscribe(controller.eventHandler);

app.register({collection: 'core', name: 'view', base: view});
app.register({collection: 'core', name: 'controller', base: controller});

app.register({collection: 'utils', name: 'animation', base: animation});
app.register({collection: 'utils', name: 'onWheelEvent', base: wheelEvent});
app.register({collection: 'utils', name: 'onTouchEvent', base: touchEvent});

for (let util in generalUtils ) {
	app.register({collection: 'utils', name: util, base: generalUtils[util]});
}


export const {core, utils} = app.services;