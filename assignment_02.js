var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("assignment_01.jison", "utf8");
var parser = new jison.Parser(bnf);


var inWordsEn = require('in-words').en;

var wordify = function(array) {
	var operators = {'+':'plus','-':'minus','/':'divided by','*':'times','[': '(',']':')'};
	return array.reduce(function(result,item){
		operators[item] == undefined ? result.push(inWordsEn(item)) : result.push(operators[item]) ;
		return result;
	},[]);
 }

var array = parser.parse("1+2+3+4");
console.log(wordify(array).join(" "));