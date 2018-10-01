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

	

	if (player < oponent){
		console.log(playerFigure, oponentFigure());	
	}
}


function oponentFigure() {
	return Math.floor(Math.random() * 3);
}




