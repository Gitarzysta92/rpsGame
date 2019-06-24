import { core } from '../../app.js';

const { controller } = core;



class GameCore {
	constructor(createContest, Player) {
        this.createContest = createContest;
        this.player = Player;
		this.contestsArchive = [];
	}

	init = () => { controller.invokeAction('open-modal') }

	newContest = ({name, rounds}) => {
		controller.invokeAction('close-modal');
		controller.invokeAction('start-game');

		this.currentContext = this.createContest({
			playerOne: new this.player({ name: name, type: 'human' }),
			playerTwo: new this.player({ name:'cpu', type: 'cpu' }),
			rounds: rounds
		}, this._archiveContest.bind(this))
	}

	_archiveContest(contest) {
		this.contestsArchive.push({
			name: contest.rounds
		})
		delete this.currentContext;
	}
}


export default GameCore;
