"use strict";
var figures = ['scissors', 'paper', 'rock'];



document.body.addEventListener('click', function(event){
	var element = event.target,
		figure = figures.indexOf(event.target.dataset.figure);
		getWinner(figure);
})


//
//  Game engine
//  - 
//

function getWinner(playerFigure) {
	var player = playerFigure,
		oponent = oponentFigure();

	if ( player === oponent - 1 || player === 2 && oponent === 0 ){
		console.log('Winner: ', figures[player], figures[oponent]);	
	} else if ( player === oponent) {
		console.log('it\' draw', player, oponent); 
	} else {
		console.log('You have lost', player, oponent);
	}
}


function oponentFigure() {
	return Math.floor(Math.random() * 3);
}




