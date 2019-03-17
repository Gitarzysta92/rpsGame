//
// Utilities - Class Finder
// - find class by part of it name
//


function findClassByString(classes, string) {
	var found = [];
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].search(string) === 0) {
			found.push(classes[i]);	
		}	
	}
	return found;
}


export {
	findClassByString
}