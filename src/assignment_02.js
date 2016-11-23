var inWordsEn = require("in-words").en;
var represent =  require("./assignment_01.js");

var wordify = function(tree) {	
	var array = represent(tree);
	var operators = {"+":"plus","-":"minus","/":"divided by","*":"times","[": "(","]":")","=": "equals"};
	return array.reduce(function(result,item){
		!operators[item] ? 
			!Number(item) ?  
				result.push(item) :
				result.push(inWordsEn(item)) 
			: result.push(operators[item]);
		return result;	
	},[]).join(" ");
};

module.exports = wordify;