var fs = require("fs");
var jison = require("jison");
var inWordsEn = require("in-words").en;
var represent =  require("./assignment_01.js");

var bnf = fs.readFileSync("parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

var wordify = function(tree) {
	var operators = {'+':'plus','-':'minus','/':'divided by','*':'times','[': '(',']':')'};
	return tree.reduce(function(result,item){
		!operators[item] ? result.push(inWordsEn(item)) : result.push(operators[item]) ;
		return result;	
	},[]);
}




var tree = parser.parse(process.argv[2]);
console.log(wordify(represent(tree)).join(" "));