var assert = require("assert");
var lib = "../lib/";
var Node = require(lib+"tree_utils.js").Node;
var LeafNode = require(lib+"tree_utils.js").LeafNode;
var Tree = require(lib+"tree_utils.js").Tree;



describe("tree_utils",function() {
  describe("Tree", function() {
    describe("#addNode",function(){
      it("should add a node to the Tree", function() { 
          var tree = new Tree();
          tree.addNode(new Node("=",[new LeafNode("a","Identifier"),new LeafNode("4","Number")]));
          assert.equal(1,tree.nodes.length);
      });
    });

    describe("#addTree",function(){
      it("should add a tree to the Tree", function() {
          var tree = new Tree();
          tree.addNode(new Node("=",[new LeafNode("a","Identifier"),new LeafNode("4","Number")]));
          assert.equal(1,tree.nodes.length);
      });
    });

    describe("#evaluate", function() {
      it("should return value of identifer for AssignmentNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("=",[new LeafNode("a","Identifier"),new LeafNode("4","Number")]));
          assert.equal(4,tree.evaluate());
      });

      it("should return result of operation for PlusOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("+",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(11,tree.evaluate());
      });

      it("should return result of operation for MinusOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("-",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(3,tree.evaluate());
      });

      it("should return result of operation for MultiplyOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("*",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(28,tree.evaluate());
      });

      it("should return result of operation for DivideOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("/",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(7/4,tree.evaluate());
      });

      it("should return result of operation for ExponentOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("^",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(Math.pow(7,4),tree.evaluate());
      });

      it("should return result of operation for FactorialOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("!",[new LeafNode("7","Number")]));
          assert.equal(5040,tree.evaluate());
      });

      it("should return result of operation for ModuloOperatorNode", function() {
          var tree = new Tree();
          tree.addNode(new Node("%",[new LeafNode("7","Number"),new LeafNode("4","Number")]));
          assert.equal(3,tree.evaluate());
      });

      it("should throw an error when identifier has no value",function(){
          var tree = new Tree();
          tree.addNode(new LeafNode("r","Identifier"));
          assert.throws(function(){evaluate(tree)}, Error, "r is not defined.");
      });
    });
  });
});


describe("scope-checking",function(){
  it("child should be able to access the memory of parent tree",function(){
          var tree = new Tree();
          tree.addNode(new Node("=",[new LeafNode("r","Identifier"),new LeafNode("4","Number")]));

          var secondTree = new Tree();
          secondTree.addNode(new LeafNode("r","Identifier"));

          tree.addTree(secondTree);

          assert.equal(4,tree.evaluate());
  });

  it("parent should not be able to access the memory of child tree",function(){
          var tree = new Tree();
          tree.addNode(new LeafNode("r","Identifier"));
          tree.addTree(new Node("=",[new LeafNode("r","Identifier"),new LeafNode("4","Number")]));
          assert.throws(function(){evaluate(tree)}, Error, "r is not defined.");
  });

  it("child should be able override parent assignment in child's scope",function(){
          var firstTree = new Tree();
          firstTree.addNode(new Node("=",[new LeafNode("r","Identifier"),new LeafNode("4","Number")]));

          var secondTree = new Tree();
          secondTree.addNode(new Node("=",[new LeafNode("r","Identifier"),new LeafNode("5","Number")]));
          secondTree.addNode(new LeafNode("r","Identifier"));

          firstTree.addTree(secondTree);

          firstTree.addNode(new LeafNode("r","Identifier"));

          assert.equal(5,secondTree.evaluate());
          assert.equal(4,firstTree.evaluate());
  });
});