var fs = require("fs");
var jison = require("jison");
var inWordsEn = require('in-words').en;
var representation = require("./assignment_01.js");

var bnf = fs.readFileSync("parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

var wordify = function(array) {
	var operators = {'+':'plus','-':'minus','/':'divided by','*':'times','[': '(',']':')'};
	return array.reduce(function(result,item){
		!operators[item] ? result.push(inWordsEn(item)) : result.push(operators[item]) ;
		return result;
	},[]);
}

var array = representation(parser.parse(process.argv[2]),[]);
console.log(wordify(array).join(" "));