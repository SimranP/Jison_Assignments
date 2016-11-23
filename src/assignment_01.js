var represent = function(tree){
	if(!tree.children) return tree.root;
	var leftChild = represent(tree.children[0]);
	var rightChild = represent(tree.children[1]); 
	return ['['].concat(leftChild).concat(tree.root).concat(rightChild).concat(']');
}

module.exports = represent;
