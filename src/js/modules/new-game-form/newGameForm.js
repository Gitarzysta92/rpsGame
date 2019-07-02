import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;

// error messages
const errorNoName = 'You are not specified your name';
const errorNoRounds = 'You are not specified rounds number';
const errorWrongRounds = 'Rounds field must be a number';


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
			const results = {}

			inputs.forEach(input => Object.defineProperty(results, input.id, {
				value: input.value,
				writable: false	
			}));

			const isValid = validateForm(results);
			isValid && controller.invokeAction('submitted-data', results);
		}
	}
});

controller.defineAction('form-submit', { exec: gameSetupForm.onSubmit, async: false });
export default gameSetupForm;

// form validate
function validateForm({name, rounds}) {
	const errors = [];
	
	if (name.length === 0) errors.push(errorNoName);
	if (rounds.length === 0) errors.push(errorNoRounds);
	if (rounds.length > 0 && !Number(rounds)) errors.push(errorWrongRounds);

	errors.length > 0 && controller.invokeAction('invalid-form-data_alert', errors);
	return errors.length > 0 ? false : true;
}




// initialize alert box
const alertBox = view.element({
	selector: '#alert-box',
	customProperties: { 
		show: function(errors) {
			this.domInstance.innerHTML = '';
			this.domInstance.style.display = 'block';
			const div = document.createElement('div');
			
			errors.forEach(error => {
				const p = document.createElement('p');
				const text = document.createTextNode(error);
				p.appendChild(text);
				div.appendChild(p);
			})
			this.domInstance.appendChild(div);
		},
		hide: function() {
			this.domInstance.style.display = 'none';
			this.domInstance.innerHTML = '';
		}
	}
})

controller.defineAction('submitted-data', { exec: alertBox.hide, async: false })
controller.defineAction('invalid-form-data_alert', { exec: alertBox.show, async: false })