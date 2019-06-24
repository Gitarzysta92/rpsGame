import { core } from '../../app.js';
import GameCore from './core';
import Contest from './contest';
import Player from './player';

const { controller } = core;



const contest = function(options, callback) {
	const contest = new Contest(options, callback);
	console.log(contest);
	controller.removeAction('start-round');
	controller.defineAction('start-round', { exec: contest.startRound.bind(contest), async: false });
}

const game = new GameCore(contest, Player);


controller.defineAction('new-game', { exec: game.init, async: false });
controller.defineAction('submitted-data', { exec: game.newContest, async: false });

