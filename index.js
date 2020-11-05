// 1. Draw a BST
// Given the data 3,1,4,6,9,2,5,7, if you were to insert this into an empty binary search tree,
//what would the tree look like? (Draw the tree, no coding needed here.)
// Draw the BST with the keys - E A S Y Q U E S T I O N
// 2. Remove the root
// Show how the above trees would look like if you deleted the root of each tree. (Draw the trees, no coding needed here.)

//1.

//3,1,4,6,9,2,5,7

//1,2,3,4,5,6,7,9

class BST {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.root = new BST(key, value, this);
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error("Key Error");
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
                 then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
                 then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
                 simply remove it and any references to it 
                 by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

const bst = new BST();

function main(list) {
  list.insert(3, 3);
  list.insert(1, 1);
  list.insert(2, 2);
  list.insert(1, 1);
  list.insert(9, 9);
  list.insert(2, 2);
  list.insert(5, 5);
  list.insert(7, 7);
  list.insert(10, 10);
  list.insert(11, 11);
  list.insert(2, 2);
  list.insert(2, 1);
  //console.log(list)
}

function height(list) {
  let countL = 0;
  let countR = 0;
  if (list.key === null) {
    return 0;
  }
  countL++;
  countR++;
  while (list.left) {
    countL++;
    if (list.left.left) {
      if (list.left.left.left) {
        list.left = list.left.left;
      } else if (list.left.left.right) {
        list.left = list.left.left;
      }
    } else if (list.left.right) {
      if (list.left.right.left) {
        list.left = list.left.right;
      } else if (list.left.right.right) {
        list.left = list.left.right;
      }
    } else if (!list.left.left && !list.left.right) {
      list.left = null;
    }
  }
  //   while (list.right) {
  //     countR++;
  //     if (list.right.left) {
  //       if (list.right.left.left) {
  //         list.right = list.right.left;
  //       } else if (list.right.left.right) {
  //         list.right = list.right.left;
  //       }
  //     } else if (list.right.right) {
  //       if (list.right.right.left) {
  //         list.right = list.right.left;
  //       } else if (list.right.right.right) {
  //         list.right = list.rightt.left;
  //       }
  //     } else if (!list.right.left && !list.right.right) {
  //       list.right = null;
  //     }
  //   }
  //   console.log(countL);
  //   console.log(countR);
  //   if (countL > countR) {
  //     return countL;
  //   } else {
  //     return countR;
  //   }
  return countL;
}

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

main(bst);
// console.log(tree(bst));
console.log(height(bst));

 var maxDepthHandler = function(root, num=1){
 // here's just base case -- if you get an empty root(because you definitely will at some point, just return a depth of zero because there's nothing in the tree!
 if(root == null){
       return 0
   }
 // this is your terminating case. a leaf node doesn't have any children, and so the root at that point will have null value. at this point just return the depth/num
   if (root.right == null && root.left == null){
       return num
   }
 //Use Math.max to get the highest between the two root depths. the rest of this code is just handling the individual root cases.
   if (root.right && root.left){
       return Math.max( maxDepthHandler(root.right, num+1), maxDepthHandler(root.left, num + 1))
   }  else if (root.right != null){
       return maxDepthHandler(root.right, num+1)
   } else {
       return maxDepthHandler(root.left, num+1)
   }
}

console.log(maxDepthHandler(bst))
