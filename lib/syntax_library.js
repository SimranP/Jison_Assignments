var library = {
	"=": function(children) {
		return children[0].toSyntax().concat('=').concat(children[1].toSyntax());
	},

	"+": function(children) {
		return children[0].toSyntax().concat('+').concat(children[1].toSyntax());
	},

	"-": function(children) {
		return children[0].toSyntax().concat('-').concat(children[1].toSyntax());
	},

	"*": function(children) {
		return children[0].toSyntax().concat('*').concat(children[1].toSyntax());
	},

	"/": function(children) {
		return children[0].toSyntax().concat('/').concat(children[1].toSyntax());
	},

	"^": function(children) {
		return ["Math.pow("].concat(children[0].toSyntax()).concat(',').concat(children[1].toSyntax()).concat(")");
	},

	"!": function(children){
		return children[0].toSyntax().concat("!");
	},

	"%": function(children){
		return children[0].toSyntax().concat('%').concat(children[1].toSyntax());
	}
}

module.exports = library;