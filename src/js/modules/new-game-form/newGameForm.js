import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;

// initialize default form
const gameSetupForm = view.element({
	selector: '#form',
	events: [
		{
			name: 'form-submit',
			type: 'submit'
		}
	],
	customProperties: {
		onSubmit: function({element, data}, next) {
			data.preventDefault();

			const inputs = element.domInstance.querySelectorAll('input'); 
			const results = {};

			inputs.forEach(input => Object.defineProperty(results, input.id, {
				value: input.value,
				writable: false	
			}));
			controller.invokeAction('submitted-data', results);
		}
	}
});

controller.defineAction('form-submit', { cb: gameSetupForm.onSubmit, async: false });


export default gameSetupForm;