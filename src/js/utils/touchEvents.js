//
//  Controls
//  - touch event controls
//

const registeredTouches = [];

function onTouchEvent(target, callback){
	target.addEventListener('touchstart', function(event) {
		registerTouch(event);
	});

	target.addEventListener('touchend', function(event) {
		registerTouch(event);
		const direction = getDirection();
		registeredTouches.length = 0;
		callback(direction);
	});
}

function registerTouch(event) {
	const touches = event.changedTouches;
	for (let i=0; i < touches.length; i++) {
		registeredTouches.push(touches[i]);
	}
}

function getDirection() {
	const touches = registeredTouches;
	const first = touches[0].clientY;
	const last = touches[touches.length - 1].clientY
	return first > last ? 'up' : 'down';
}




export default onTouchEvent;