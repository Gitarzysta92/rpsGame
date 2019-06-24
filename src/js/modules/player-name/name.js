import { core } from '../../app.js';

const { controller, view } = core;



const players = ['human','cpu'];
players.forEach(player =>  setPlayerName(player));


function setPlayerName(player) {
	const nameElement = view.element({
		selector: `#${player} span`,
		customProperties: {
			setName: function(name) {
				this.domInstance.innerHTML = name;
			}
		}
	})
	controller.defineAction(`${player}-set-name`, {exec: nameElement.setName, async: false});
	return setPlayerName;
}



