import { core } from '../../app.js';

const { controller } = core;


class Player {
	constructor() {

	}
}


class Contest {
	constructor(setup) {
		this.firstPlayer = setup.playerOne;
		this.secondPlayer = setup.playerTwo;
		this.rounds = setup.rounds;
		this.defineControllerActions();
		controller.invokeAction('start-game');	
	}

	defineControllerActions() {
		controller.defineAction('start-round', { cb: this.nextRound, async: false });
	}

}

class GameCore {
	constructor() {
		this.contestsArchive = [];
		this.cpuPlayer = new Player('cpu');
		this.defineControllerActions();
	}

	start = ({element, data}, next) => {
		controller.invokeAction('open-modal');
		next();
	}

	nextRound = ({element, data}) => {
		console.log('next round');
	}

	newGame({name, rounds}) {
		const player = new Player(name);
		controller.invokeAction('close-modal');
		this.createContest({
			playerOne: player,
			playerTwo: this.cpuPlayer,
			rounds: rounds
		})
	}

	createContest({playerOne, playerTwo, rounds}) {
		if (!(playerOne && playerTwo && rounds)) {
			throw new Error('Error while creating a new contest');
		} else {
			this.currentContest = new Contest({playerOne, playerTwo, rounds});
		}
	}

	defineControllerActions() {
		controller.defineAction('new-game', { cb: this.start, async: true });
		controller.defineAction('submitted-data', { cb: this.newGame, async: false });
	}
}

/*
function oponentFigure() {
	var number = Math.floor(Math.random() * 3),
		oponent = document.getElementById('player-2').getElementsByTagName('i')[0];;
	setFigure(oponent, number);
	return number;
}



var figures = ['scissors', 'paper', 'rock'],
	rounds = [],
	gameSettings = [];
function getWinner(playerFigure) {
	var player = playerFigure,
		oponent = oponentFigure();
	controlsStatus('off');
	clearAnimation( circle.querySelector('i'), 'move-');
	if ( player === oponent - 1 || player === 2 && oponent === 0 ){
		blinkWinner(figures[player]);
		rounds.push('player');
		return 'You win';
	} else if ( player === oponent) {
		blinkWinner(figures[player]);
		rounds.push('draw');
		return 'Draw';
	} else {
		blinkWinner(figures[oponent]);
		rounds.push('cpu');
		return 'You lost';
	}
}



*/


const game = new GameCore();

