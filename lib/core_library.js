var library = {
	"=": function(children) {
		return tree.memory[children[0].root] = children[1].evaluate();
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
		return children[0].evaluate() % children[1].evaluate();
	},

	"<": function(children){
		return children[0].evaluate() < children[1].evaluate();
	},

	">": function(children){
		return children[0].evaluate() > children[1].evaluate();
	},

	"<=": function(children){
		return children[0].evaluate() <= children[1].evaluate();
	},

	">=": function(children){
		return children[0].evaluate() >= children[1].evaluate();
	},

	"==": function(children){
		return children[0].evaluate() == children[1].evaluate();
	},

	"if": function(children){
		return children[0].evaluate() && children[1].evaluate();
	},

	Number: function(value) {
		return Number(value);
	},

	Boolean: function(value) {
		return value == "true" ? true : false;
	},

	Identifier: function(value) {
		var currentTree = tree;
		var result = currentTree.memory[value];
		while(!result){
			if(!currentTree.parent)
				if(!result) throw new Error(value+" is not defined.");
			currentTree = currentTree.parent;
			result = currentTree.memory[value];
			if(result) return result;
		}
		return result;
	},

	clearMemory: function() {
		tree = undefined;
	},

	feedMemory: function(t) {
		tree = t;
	}
}

var tree;

var fact = function(number) {
	if(number <= 1) return number; 
	return number*fact(number-1);
}

module.exports = library;