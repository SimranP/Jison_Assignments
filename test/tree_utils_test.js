var assert = require('assert');
var lib = "../lib/";
var Node = require(lib+'tree_utils.js').Node;
var LeafNode = require(lib+'tree_utils.js').LeafNode;

describe('Node', function() {
  describe('#evaluate', function() {
    it('should return value of identifer for AssignmentNode', function() {
		var tree =  new Node("=",[new LeafNode('a','Identifier'),new LeafNode('4','Number')]);    	
      	assert.equal(4,tree.evaluate());
    });

    it('should return result of operation for PlusOperatorNode', function() {
		var tree =  new Node("+",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(11,tree.evaluate());
    });

    it('should return result of operation for MinusOperatorNode', function() {
		var tree =  new Node("-",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(3,tree.evaluate());
    });

    it('should return result of operation for MultiplyOperatorNode', function() {
		var tree =  new Node("*",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(28,tree.evaluate());
    });

    it('should return result of operation for DivideOperatorNode', function() {
		var tree =  new Node("/",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(7/4,tree.evaluate());
    });

    it('should return result of operation for ExponentOperatorNode', function() {
		var tree =  new Node("^",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(Math.pow(7,4),tree.evaluate());
    });

    it('should return result of operation for FactorialOperatorNode', function() {
		var tree =  new Node("!",[new LeafNode('7','Number')]);    	
      	assert.equal(5040,tree.evaluate());
    });

    it('should return result of operation for ModuloOperatorNode', function() {
		var tree =  new Node("%",[new LeafNode('7','Number'),new LeafNode('4','Number')]);    	
      	assert.equal(3,tree.evaluate());
    });
  });
});