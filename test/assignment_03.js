var assert = require('assert');
var src = "../src/";
var evaluate = require(src+'assignment_03.js');

describe('evaluate', function() {
	it('should return result of given expression', function() {
		var expression = "x=10;\n5+x*2;";
		assert.equal(25,evaluate(expression));
	});
});