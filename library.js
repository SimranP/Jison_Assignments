var library = {
	"=": function(children) {
		return memory[children[0]] = children[1].evaluate();
	},

	"+": function(children) {
		return children[0].evaluate() + children[1].evaluate();
	},

	"-": function(children) {
		return children[0].evaluate() - children[1].evaluate();
	},

	"*": function(children) {
		return children[0].evaluate() * children[1].evaluate();
	},

	"/": function(children) {
		return children[0].evaluate() / children[1].evaluate();
	},

	Number: function(value) {
		return Number(value);
	},

	Identifier: function(value) {
		return memory[value];
	}
}

var memory = {};

module.exports = library;