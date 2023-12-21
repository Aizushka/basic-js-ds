const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  contructor() {
    this.rootNode = null;
  }

  root() {
    if (this.rootNode) return this.rootNode;
    return null;
  }

  add(data) {
    function addData(node, value) {
      if (!node) return new Node(value);
      if (node.data == value) return node;
      
      node.data < value? 
        node.right = addData(node.right, value) :
        node.left = addData(node.left, value);
      
      return node;
    }

    this.rootNode = addData(this.rootNode, data);
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    function findData(node, value) {
      if (!node) return node;
      if (node.data == value) return node;
      return node.data < value? 
        findData(node.right, value) :
        findData(node.left, value);
    }
    return findData(this.rootNode, data);
  }

  remove(data) {
    function removeNode(node, value){

      if (!node) return null;

      if (node.data > value){
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value ) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) return null;
        
        if (!node.left){
          node = node.right;
          return node;
        }
        
        if (!node.right){
          node = node.left;
          return node;
        }
        
        let minRightNode = node.right;

        while(minRightNode.left){
          minRightNode = minRightNode.left;
        }
        
        node.data = minRightNode.data;
        node.right = removeNode(node.right, minRightNode.data);
      }

      return node;
    }

    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    let node = this.rootNode;
    if(!node) return null;
    while(node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    if(!node) return null;
    while(node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};