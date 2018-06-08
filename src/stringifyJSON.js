// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  	var keyArr = [], arrValues = [], objKeys = [];

	if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
	    return '' + obj;
	} else if (typeof obj === 'string') {
	    return '"' + obj + '"';
	} else if (Array.isArray(obj)) {
	    if (obj.length === 0) {
	        return '[]';
	    } else {
	        obj.forEach(function(element) {
	            arrValues.push(stringifyJSON(element));
	        });
	        return '[' + arrValues + ']';
	    }
	} else if (obj instanceof Object) {
	    objKeys = Object.keys(obj);
	    objKeys.forEach(function(key) {
	        var keyString = '"' + key + '":';
	        var keyValue = obj[key];
	        if (keyValue instanceof Function || typeof keyValue === undefined) {
	            keyArr.push('');
	        } else if (typeof keyValue === 'string') {
	            keyArr.push(keyString + '"' + keyValue + '"');
	        } else if (typeof keyValue === 'boolean' || typeof keValOut === 'number' || keyValue === null) {
	            keyArr.push(keyString + keyValue);
	        } else if (keyValue instanceof Object) {
	            keyArr.push(keyString + stringifyJSON(keyValue));
	        }
	    });
	    return '{' + keyArr + '}';
	} 
};