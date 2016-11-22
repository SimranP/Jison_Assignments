var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

var represent = function(tree){
	if(!tree.children) return tree.root;
	var leftChild = represent(tree.children[0]);
	var rightChild = represent(tree.children[1]); 
	return ['['].concat(leftChild).concat(tree.root).concat(rightChild).concat(']');
}

module.exports = represent;
var tree = parser.parse(process.argv[2]);
console.log(represent(tree[0]));