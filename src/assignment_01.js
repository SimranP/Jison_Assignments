var represent = function(tree,brackets){
	if(!tree.children) return [tree.root];
	var leftChild = represent(tree.children[0],brackets);
	var rightChild = represent(tree.children[1],brackets);
	return [brackets.open].concat(leftChild).concat(tree.root).concat(rightChild).concat(brackets.close);
}

module.exports = represent;
