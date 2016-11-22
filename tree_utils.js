class Node { 
	constructor(value,children) {
		this.root = value;
		this.children = children;
	}
}

class LeafNode {
	constructor(value) {
		this.root = value;
	}
}

module.exports = { Node: Node, LeafNode: LeafNode };