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

	"^": function(children) {
		return Math.pow(children[0].evaluate(),children[1].evaluate());
	},

	"!": function(children){
		return fact(children[0].evaluate());
	},

	"%": function(children){
		return children[0].evaluate()*(children[1].evaluate()/100);
	},

	Number: function(value) {
		return Number(value);
	},

	Identifier: function(value) {
		return memory[value];
	}
}

var memory = {};

var fact = function(number) {
	if(number == 2) return 2; 
	return number*fact(number-1);
}

module.exports = library;