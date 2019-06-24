//
//  Controls
//  - wheel event controls
//

function onWheelEvent(domObject, callback){
	var element = domObject,
		args = [].slice.call(arguments)

	if (args.indexOf('remove') > -1) {
		// element.removeEventListener('wheel', wheelEventHandler);
		var clone = element.cloneNode(true);

		element.parentNode.replaceChild(clone, element);
		return;
	}

	var events = [],
		threshold = 300;
		
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
				callback(element, direction);	
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

export default onWheelEvent;