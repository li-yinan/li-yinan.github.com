class Node {
    parentNode = null;
    children = [];

    constructor(x1 = 0, y1 = 0, x2 = 10000, y2 = 100000, root) {
        this.top = y1;
        this.left = x1;
        this.width = x2 - x1;
        this.height = y2 - y1;
        this.root = root;
        this.parentNode = this.getParent();
        if (this.parentNode) {
            this.parentNode.append(this);
            this.level = this.parentNode.level + 1;
        }
        else {
            this.level = 1;
        }
    }

    append(node) {
        this.children = [...this.children, node];
    }

    /**
     * 判断已经存在的节点哪个能包围当前节点，并且处于最深层级
     *
     * @param {Node} node 目标节点
     *
     * @return {boolean}
     */
    insideOne(node) {
        var tolerance = 3;
        if (
            this.top + tolerance >= node.top
            && this.left + tolerance >= node.left
            && (this.left + this.width - tolerance) <= (node.left + node.width)
            && (this.top + this.height - tolerance) <= (node.top + node.height)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    inside(node) {
        var _this = this;
        if (this.insideOne(node)) {
            let res = null;
            node.children.forEach(function (child) {
                res = res || _this.inside(child);
            });
            // 子元素满足要求
            if (res) {
                return res;
            }
            // 子元素不满足要求
            else {
                return node;
            }
        }
        // 不在当前元素里
        else {
            return null;
        }
    }

    getParent() {
        if (!this.root) {
            return null;
        }
        var parentNode = this.inside(this.root); 


        return parentNode;
    }
}

export function insert(root, options) {
    var {x1, y1, x2, y2} = options;
    if (!root) {
        root = new Node();
    }
    let node = new Node(x1, y1, x2, y2, root);

    return root;
}
