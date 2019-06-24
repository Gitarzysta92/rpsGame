import { core, utils } from '../../app.js';

const { controller, view } = core;
const { animation } = utils;




const players = ['human','cpu'];
const archives = players.map(player => {
	const moves = createLastMovesList(player)
	return { exec: moves.clearArchive, async: true }
});


controller.defineActions(`clear-all-archives`, archives);


function createLastMovesList(player) {
	const figuresArchive = view.element({
		selector: `#${player} .latest-moves ul`, 
		customProperties: {
			length: 3,
			updateArchive: function({figureClass, isWin}) {
				const figures = this.domInstance.getElementsByTagName('li');
				const figure = document.createElement('li');
				figure.innerHTML = '<i class="far fa-hand-' + figureClass + '"></i>';
	
				if (isWin) figure.classList.add('win');
	
				if (figures.length === this.length) this.domInstance.removeChild(figures[this.length - 1])
				this.domInstance.insertBefore(figure, this.domInstance.firstChild).style.display = 'none';
	
				animation(figure, function(element, animate) {
					element.style.display = 'flex';
					animate();
				}, 'zoom-in');
			},
			clearArchive: function(noop, next) {
				this.domInstance.innerHTML = '';
				next();
			}
		}
	})
	controller.defineAction(`${player}-update-archive`, { exec: figuresArchive.updateArchive, async: false });

	return figuresArchive;
}




