import { core } from '../../app.js';

const { controller } = core;



class Contest {
	constructor(setup, callback) {
		this.rounds = setup.rounds;
		this.currentRound = 1;
		this.firstPlayer = setup.playerOne;
		this.secondPlayer = setup.playerTwo;

		controller.invokeAction('clear-all-archives');
		controller.invokeAction('show-center-message', `Round ${this.currentRound}`);

		this.startRound();
		this.archivize = callback;
	}

	startRound() {
		controller.invokeAction('hide-center-message');	
		controller.invokeAction('start-countdown', this.resolveRound.bind(this));	
	}

	prepareNextRound() {
		this.currentRound += 1;
		controller.invokeAction('show-center-message', `Round ${this.currentRound}`);
		controller.invokeAction('show-round-button');
	}

	endContest(player) {
		controller.invokeAction('show-center-message', `${player.name} win!`);
		controller.invokeAction('show-game-button');
		this.archivize(this);
	}

	resolveRound() {
		const player = this.firstPlayer.figure;
		const oponent = this.secondPlayer.figure;
		let contestWinner = false;

		if ( player === oponent - 1 || player === 2 && oponent === 0 ){
			controller.invokeAction('show-result', 'You win');
			contestWinner = this.setWinner(this.firstPlayer);
		} else if ( player === oponent) {
			controller.invokeAction('show-result', 'Its a draw');
		} else {
			controller.invokeAction('show-result', 'You lost');
			contestWinner = this.setWinner(this.secondPlayer);
		}

		console.log(this.currentRound, player, oponent, contestWinner, this);

		this.firstPlayer.archiveFigure(player, this.currentRound);
		this.secondPlayer.archiveFigure(oponent, this.currentRound);

		contestWinner ? this.endContest(contestWinner) : this.prepareNextRound();
	}

	setWinner(player) {	
		const winTokens = player.addWinToken(this.currentRound);
		return this.isContestWinner(winTokens) ? player : false;
		
	}

	isContestWinner(winTokens) {
		const contestWinCap = Math.floor(this.rounds /2) + 1;
		return winTokens >= contestWinCap ? true : false;
	}
}


export default Contest;