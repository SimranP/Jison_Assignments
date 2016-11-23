var assert = require('assert');
var lib = "../lib/";
var src = "../src/";
var represent = require(src+'assignment_01.js');
var Node = require(lib+'tree_utils.js').Node;
var LeafNode = require(lib+'tree_utils.js').LeafNode;

describe('represent', function() {
	it('should return array representation of a given single level tree', function() {
		expected = ["[","a","=","4","]"];
		actual = represent(new Node("=",[new LeafNode('a'),new LeafNode('4')]));
		assert.deepEqual(expected,actual);
	});

	it('should return array representation of a given two level tree', function() {
		expected = ["[","a","=","[","4","+","3","]","]"];
		actual = represent(new Node("=",[new LeafNode("a"),new Node("+",[new LeafNode("4"),new LeafNode("3")])]));
		assert.deepEqual(expected,actual);
	});
});