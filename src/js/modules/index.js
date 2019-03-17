import game from './game-core/game.js';
import modalWindow from './modal-window/modalWindow.js';
import startButton from './start-button/startButton.js';
import gameForm from './new-game-form/newGameForm.js';
import figureCircle from './figure-circle/figureCircle.js';


const Modules = {
	_dependencies: {},
	connect(provider) {
		this._dependencies = provider
	},
	get dependencies() {
		return this._dependencies;
	}
}


export default Modules;
