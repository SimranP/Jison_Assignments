var fs = require("fs");
var jison = require("jison");
var data = process.argv[2];
var represent =  require("./assignment_01.js");

var bnf = fs.readFileSync("parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);
var trees = parser.parse(data);

var result = trees.map(function(tree) {
	return tree.evaluate();
})

console.log(result);