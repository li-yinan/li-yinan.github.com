function build() {
}

let root = null;

class Node {
    parentNode = null;
    children = [];
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.parentNode = getParent(root, x1, y1, x2, y2);
        this.top = y1;
        this.left = x1;
        this.width = x2 - x1;
        this.height = y2 - y1;
    }
    append(node) {
        this.children.push(node);
    }
}

function getParent(root, x1, y1, x2, y2) {
    if (!root) {
        return null;
    }
}

export function insert(options) {
    var {x1, y1, x2, y2} = options;
    if (!root) {
        root = new Node();
    }
    let node = new Node(x1, y1, x2, y2);
    node.parentNode = root;
    root.append(node);
}

export function reset() {
    root = null;
}

export function get() {
    return root;
}

export default build;
