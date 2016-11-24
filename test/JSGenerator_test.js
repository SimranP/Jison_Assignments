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

	it("should return equivalent javascript code for given consoling variable expression", function() {
		var expected = "var a=4;\nconsole.log(a);";
		var expression = "a=4;a;";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});

	it("should return equivalent javascript code for given consoling number expression", function() {
		var expected = "console.log(4);";
		var expression = "4;";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});

	it("should return equivalent javascript code for double assignment expression", function() {
		var expected = "var a=4;\nvar a=5;";
		var expression = "a=4;a=5;";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});

	it("should return equivalent javascript code for double assignment and consoling expression", function() {
		var expected = "var a=4;\nvar a=a+5;\nconsole.log(a);";
		var expression = "a=4;a=a+5;a";
		var actual = generate(expression);

		assert.deepEqual(expected,actual);
	});
});	