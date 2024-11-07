function Node() {
  let data = null;
  let left = null;
  let right = null;

  return { data, left, right };
}

function Tree(array) {

    // The root takes the return value of the BST function
    let root = buildTree(array);

    return { root }
}


//sample array
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

function removeDuplicates(data) {
  return data.filter((value, index) => data.indexOf(value) === index)
}

function buildTree(array) {
    if (array.length == 0) {
        return null
    }
    
    if (array.length == 1) {
      const root = new Node()
      root.data = array[0]
      root.left = null
      root.right = null
      return root
    }
    let sorted_array = array.toSorted((a,b) => (a - b))
    sorted_array = removeDuplicates(sorted_array)
    let size = sorted_array.length
    let middle = null
    if (size % 2 === 0) {
        middle = sorted_array[size/2]
    }
    else {
        middle = sorted_array[(size/2) + 0.5]
    }
    const pos = sorted_array.indexOf(middle)
    const left_arr = sorted_array.slice(0, pos)
    const right_arr = sorted_array.slice(pos+1, size)
    const root = new Node()
    root.data = middle
    root.left = buildTree(left_arr)
    root.right = buildTree(right_arr)
    return root
}

let fun = Tree(arr)

function insert(value) {
  let root = fun.root
  const x = value
  while (root.left || root.right) {
    if (x < root.data) {
      root = root.left
    } else {
      root = root.right
    }
  }
  const inserted = new Node()
  inserted.data = x
  inserted.left = null
  inserted.right = null
  if (x < root.data) {
    root.left = inserted
  } else {
    root.right = inserted
  }
}


function deleteItems(value) {
  let root = fun.root
  const x = value
  while (root.left || root.right) {
    if (root.left == null || root.right == null ) {
      if (root.left) {
        if (root.left.left) {
          root.left.left = null
          break
        }
        else {
          root.left.right = null
          break
        }
      }
      else if (root.right) {
        if (root.right.left) {
          root.right.left = null
          break
        }
        else {
          root.right.right = null
          break
        }
      }
    }
    if (root.left.data === x || root.right.data === x ) {
      if (root.left.data === x) {
        root.left = null
        break
      }
      else {
        root.right = null
        break
      }
    }
    else if (x < root.data) {
      root = root.left
    } 
    else if (x > root.data) {
      root = root.right
    }
    else {
      break
    }
  }
}

function find(value) {
  let root = fun.root
  let to_search = value
  while (root) {
    if (root.data == to_search) {
      return root
    }
    else if (to_search < root.data) {
      root = root.left
    }

    else if (to_search >= root.data) {
      root = root.right
    }
    else {
      return "Value does not exist."
    }
  }
}

function increment(node) {
  let data = node.data 
  data += 1
  return data
}
let queue = []

function levelOrder(callback) {
  let root = fun.root
  queue.push(root)
  while (root.left) {
    callback(root)
    if (root.right) {
      queue.push(root.right)
    }
    if (root.left) {
      queue.push(root.left)
    }
    root = root.left
  }
  root = fun.root
  while (root.right) {
    callback(root)
    if (root.right) {
      queue.push(root.right)
    }
    if (root.left) {
      queue.push(root.left)
    }
    root = root.right
  }
  let temp_arr = []
  for (let i = 0; i < queue.length; i++) {
    temp_arr.push(callback(queue[i]))
  }
  fun = Tree(temp_arr)

}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

prettyPrint(fun.root)
levelOrder(increment)
prettyPrint(fun.root)