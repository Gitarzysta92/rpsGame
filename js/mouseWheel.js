function onWheelEvent(domObject, callback){
	var element = domObject,
		events = [],
		threshold = 200;
		
	element.addEventListener('wheel', wheelEventHandler);

	function wheelEventHandler(event) {
		var eventTime = event.timeStamp.toFixed(0),
			direction = '';

			if ( event.deltaY > 0 ) {
				direction = 'down'; 
			} else {
				direction = 'up';
			}

			events.push(eventTime);

			if ( eventActivity(eventTime) === true ) {
				callback(direction);	
			}	
	}

	function eventActivity(time) {
		var latestEvent = parseInt(events[events.length - 2], 10) + threshold || parseInt(events[events.length - 1], 10) - 100,
			currentEvent = parseInt(events[events.length - 1], 10);
		
		if ( latestEvent < currentEvent ) {
			events.splice(0, events.length - 1);
			return true;		
		} else {
			return false;
		}	
	}
}


onWheelEvent(document.body, function(direction){
	console.log(direction);
})