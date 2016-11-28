var assert = require("assert");
var src = "../src/";
var evaluate = require(src+"evaluator.js");

describe("evaluate", function() {
	// *** assignment_03 ***
	it("should return result of given expression consisting one assignment", function() {
		var expression = "x=10;\n5+x*2;";
		assert.equal(25,evaluate(expression));
	});

	it("should return result of given expression consisting more than one assignment", function() {
		var expression = "x=10;\ny=20;\nz=30;\nx^2+y^2-z^2;";
		assert.equal(-400,evaluate(expression));
	});

	it("should return result of given expression consisting more than one assignment", function() {
		var expression = "x=10;\ny=20;\nz=30;\n(x^2)+(y^2)-(z^2);";
		assert.equal(-400,evaluate(expression));
	});

	it("should throw an error identifier is missing", function() {
		var expression = "x^2;x=10;";
		assert.throws(function(){evaluate(expression)}, Error, "x is not defined.");
	});

	// *** assignment_04 ***

	it("should have the ability to handle complex assignments", function() {
		var expression = "x=10;y=x+20;y+5;";
		assert.equal(35,evaluate(expression));
	});

	it("should be able to reassign a value to an identifier", function() {
		var expression = "x=2;x=2^5;x;";
		assert.equal(32,evaluate(expression));
	});

	it("should evaluate a number as an expression", function() {
		var expression = "3;";
		assert.equal(3,evaluate(expression));
	});

	// *** assignment_06 ***

	describe("decison-making statements",function() {
		it("should evaluate expression if condition is true", function() {
			var expression = "if true { 3; };";
			assert.equal(3,evaluate(expression));
		});

		it("should not evaluate expression if condition is false", function() {
			var expression = "if false { 3; };";
			assert.equal(false,evaluate(expression));
		});

		it("should evaluate expression if condition is true", function() {
			var expression = "a=4;if true { a; };";
			assert.equal(4,evaluate(expression));
		});

		it("should evaluate expression for == operator", function() {
			var expression = "if 4==4 { 4; };";
			assert.equal(4,evaluate(expression));
		});

		it("should evaluate expression for < operator", function() {
			var expression = "if 3<4 { 4; };";
			assert.equal(4,evaluate(expression));
		});

		it("should evaluate expression for > operator", function() {
			var expression = "if 5>4 { 4; };";
			assert.equal(4,evaluate(expression));
		});

		it("should evaluate expression for >= operator", function() {
			var expression = "if 5>=4 { 4; };";
			assert.equal(4,evaluate(expression));
		});

		it("should evaluate expression for <= operator", function() {
			var expression = "if 4<=4 { 4; };";
			assert.equal(4,evaluate(expression));
		});
	})
});