var startButton = document.getElementById('game-start');



startButton.addEventListener("click", function(event){
	this.classList.add("started");
	console.log(this);
});