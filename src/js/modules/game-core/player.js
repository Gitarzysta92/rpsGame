import { core } from '../../app.js';

const { controller } = core;



class Player {
	constructor({name = 'player-1', type = 'cpu'}) {
		this.figures = ['scissors', 'paper', 'rock'];
		this.name = name;
		this.type = type;
		this.figure = {};
		this.winRounds = [];
		this._definePlayerType(type);

		controller.invokeAction(`${this.type}-set-name`, this.name);
	}

	addWinToken(roundNumber) {
		controller.invokeAction(`${this.type}-blink-circle`);
		return this.winRounds.push(roundNumber);
	}

	archiveFigure(figure, round) {
		const currentFigure = {
			figureClass: this.figures[figure],
			isWin: this.winRounds.find(win => win === round) ? true : false
		}
		controller.invokeAction(`${this.type}-update-archive`, currentFigure);
	}

	_definePlayerType(type) {
		if (type === 'cpu') {
			this._defineFigureGetter(function() {
				const figureNumber = Math.floor(Math.random() * 3);
				controller.invokeAction('cpu-set-figure', figureNumber);
				return figureNumber;
			})
		} else {
			this._defineFigureGetter(function() {
				// TO DO: This is looking little odd
				// need to figure out how to fix this 
				const figure = { number: {} }
				figure.setNumber = function(value) { figure.number = value }
				
				controller.invokeAction(`${this.type}-get-figure`, figure.setNumber);
				return figure.number;
			})
		}
	}
	_defineFigureGetter(getMethod) {
		Object.defineProperty(this, 'figure', {
			get: getMethod
		})
	}
}

export default Player;

