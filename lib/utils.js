var utils = exports;

utils.isArray = function(el){
	if(Object.prototype.toString.call(el) === '[object Array]') {
		return true;
	}
	return false;
};

utils.flattenArray = function(el){
	// [1,2,3] --> '1,2,3'
	return el.toString();
};