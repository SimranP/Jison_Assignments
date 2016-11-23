var library =  require("./core_library.js");

class Node { 
	constructor(value,children,type) {
		this.root = value;
		this.children = children;
		this.type = type;
	}

	evaluate(){
		return library[this.root](this.children);
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
}

class Tree {
	constructor() {
		this.nodes = [];
	}

	addNode(node){
		this.nodes.push(node);
	}

	evaluate(){
		var results = this.nodes.map(function(node) {
			return node.evaluate();
		});
		library.clearMemory();
		return results[results.length-1];
	}
}

module.exports = { Node: Node, LeafNode: LeafNode, Tree: Tree };