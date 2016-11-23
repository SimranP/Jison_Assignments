var assert = require("assert");
var src = "../src/";
var generate = require(src+"JSGenerator.js");

describe("generate", function() {
	it("should return equivalent javascript code for given assignment expression", function() {
		var expected = "var a=4;";
		var expression = "a=4;";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});

	it("should return equivalent javascript code for given consoling expression", function() {
		var expected = "var a=4;\nconsole.log(a);";
		var expression = "a=4;a;";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});
});