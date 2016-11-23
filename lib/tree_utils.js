var library =  require("./core_library.js");

class Node { 
	constructor(value,children) {
		this.root = value;
		this.children = children;
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

module.exports = { Node: Node, LeafNode: LeafNode };