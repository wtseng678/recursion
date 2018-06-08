// this is whindex you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scrindexch:


var parseJSON = function(json) {
	if(json.includes("function")) {
		error(SyntaxError);
	}

	var escapes = { 
	  'b': '\b',
	  'n': '\n',
	  't': '\t',
	  'r': '\r',
	  'f': '\f',
	  '\"': '\"',
	  '\\': '\\'
	};

	function value() {
	  switch(char) {
	    case '{':
	      return object();
	    case '[':
	      return array();
	    case '\"':
	      return string();
	    case 't':
	    case 'f':
	      return boolean();
	    case 'n':
	      return isNull();
	    default:
	      if(char === '-' || (char && char >= 0 && char <= 9)) {
	        return number();
	      } else {
	        error('bad JSON');
	      }
	      break;
	  }
	};

	function next() {
	  index += 1;
	  char = json.charAt(index); 
	  return char;
	};

	function error(message) { 
	  console.log(message);
	  throw undefined;
	};



	function isNull() {
	  var nully = '';
	  if(char === 'n') {
	    _.times(4, function() {
	      nully += char;
	      next();
	    });
	    if(nully === 'null') {
	      return null;
	    } else {
	      error('bad null');
	    }
	  }

	  error('bad null');
	};

	function boolean() {
	  var bool = '';
	  if(char === 't') {
	    _.times(4, function() {
	      bool += ch;
	      next();
	    });
	    if(bool === 'true') {
	      return true;
	    } else {
	      error('bad bool');
	    }
	  } else if(char === 'f') {
	    _.times(5, function() {
	      bool += char;
	      next();
	    });
	    if(bool === 'false') {
	      return false;
	    } else {
	      error('bad bool');
	    }
	  }

	  error('bad bool');
	};



	function number() {
	  var num = ''; 
	  function getDigits() { 
	    while(char && char >= 0 && char <= 9) { 
	      num += char;
	      next();
	    }
	  }

	  if(char === '-') {
	    num += char;
	    next();
	  }

	  getDigits();



	  if(!isNaN(Number(num))) {
	    return Number(num);
	  } else { 
	    error('bad number');
	  }
	};

	function string() {

	  var string = '';
	  if(char !== '\"') {
	  	error('string should start with \"');
	  }
	  next();
	  while(char) {

	    if(char === '\"') {
	      next();
	      return string;
	    }

	    if(char === '\\') {
	      next();
	      if(escapes.hasOwnProperty(char)) {
	        string += escapes[char];
	      } else {
	        string += char;
	      }
	    } else {
	      string += char;
	    }
	    next();
	  }
	  error('bad string');
	};

	function array() {
	  var array = [];
	  if(char !== '[') {
	  	error('array should start with [');
	  }
	  if(next() === ']') { 
	  	return array;
	  }

	  do {
	    array.push(value());
	    if(char === ']') { 
	      next();
	      return array;
	    }
	  } while(char && char === ',' && next()); 

	  error('bad array');
	};

	function object() {

	  var object = {};
	  if(char !== '{') {
	  	error('object should start with {');
	  }
	  if(next() === '}') {
	  	return object; 
	  }

	  do {
	    var key = string(); 
	    if(char !== ':') {
	      error('object property expecting ":"');
	    }

	    next();
	    object[key] = value(); 
	    if(char === '}') { 
	      next();
	      return object;
	    }
	  } while(char && char === ',' && next()); 

	  error('bad object');
	};

  var index = 0;
  var char = json.charAt(index);
  return value();	
};
