var assert = require('assert');
var lib = "../lib/";
var src = "../src/";
var wordify = require(src+'assignment_02.js');
var Node = require(lib+'tree_utils.js').Node;
var LeafNode = require(lib+'tree_utils.js').LeafNode;

describe('wordify', function() {
	it('should return wordic representation of a given single level tree', function() {
		expected = "( a equals four )";
		actual = wordify(new Node("=",[new LeafNode('a'),new LeafNode('4')]));
		assert.equal(expected,actual);
	});

	it('should return wordic representation of a given two level tree', function() {
		expected = "( a equals ( four plus three ) )";
		actual = wordify(new Node("=",[new LeafNode("a"),new Node("+",[new LeafNode("4"),new LeafNode("3")])]));
		assert.equal(expected,actual);
	});
});