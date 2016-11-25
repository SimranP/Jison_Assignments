var library =  require("./core_library.js");
var syntax_library =  require("./syntax_library.js");

class Node { 
	constructor(value,children,type) {
		this.root = value;
		this.children = children;
		this.type = type;
	}

	evaluate(){
		return library[this.root](this.children);
	}

	toSyntax(){
		return syntax_library[this.root](this.children);
	}
}

class LeafNode {
	constructor(value,type) {
		this.root = value;
		this.type = type;
	}

	evaluate(){
		return library[this.type](this.root);
	}

	toSyntax(){
		return [this.root];
	}
}


class Tree {
	constructor() {
		this.memory = {};
		this.nodes = [];
	}

	addNode(node){
		this.nodes.push(node);
	}

	addTree(tree) {
		tree.parent = this;
		this.nodes.push(tree);
	}

	evaluate(){
		var results =[];
		
		for (var node in this.nodes) {
			library.feedMemory(this);
  			results.push(this.nodes[node].evaluate());
		}

		library.clearMemory();
		return results[results.length-1];
	}
}

module.exports = { Node: Node, LeafNode: LeafNode, Tree: Tree };