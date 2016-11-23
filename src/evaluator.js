var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync(process.cwd()+"/lib/parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);

var evaluate = function(expression) {
	var tree = parser.parse(expression);
	return tree.evaluate();
};

module.exports = evaluate;