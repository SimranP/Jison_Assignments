var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync(process.cwd()+"/lib/parse_tree.jison", "utf8");
var parser = new jison.Parser(bnf);


var addSyntax = {
	"Arithmetic Expression": function(expression){
		return "console.log("+expression+");";
	},

	"Assignment Expression": function(expression){
		return "var "+expression+";";
	},

	"Identifier": function(expression){
		return this["Arithmetic Expression"](expression);
	},

	"Number": function(expression){
		return this["Arithmetic Expression"](expression);
	}
}

var generate = function(expression) {
	var statements = parser.parse(expression).nodes;
	var code = statements.map(function(statement){
		return addSyntax[statement.type](statement.toSyntax().join(""));
	});
	return code.join("\n");
}

module.exports = generate;