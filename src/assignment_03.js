var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync(process.cwd()+"/lib/parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

var evaluate = function(expression) {
	var trees = parser.parse(expression);
	var results = trees.map(function(tree) {
		return tree.evaluate();
	})
	return results[results.length-1];
};

module.exports = evaluate;