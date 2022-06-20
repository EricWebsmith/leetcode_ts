import { Queue } from '@datastructures-js/queue';

export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number | null, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === null || val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

export function treeNode2Array(root: TreeNode): (number | null)[] {
    if (root === null) { return []; }
    const q: (TreeNode | null)[] = [root];
    const ans: (number | null)[] = [];
    while (q.length > 0) {
        const node = q.shift();
        if (node) {
            ans.push(node.val);
            q.push(node.left);
            q.push(node.right);
        } else {
            ans.push(null);
        }
    }

    while (ans[ans.length - 1] === null) {
        ans.pop();
    }

    return ans;
}

export function array2TreeNode(array: (number|null)[]): TreeNode|null {
    if (!array || array.length === 0) {
        return null;
    }
    const n = array.length;
    const root = new TreeNode(array[0]);
    const q = [root];
    for (let i = 1; i < n; i += 2) {
        let node = q.shift();

        let left = null;
        if (array[i] !== null) {
            left = new TreeNode(array[i]);
            if (node) {
                node.left = left;
            }
            q.push(left);
        }


        let right = null;
        if (i + 1 < n && array[i + 1] !== null) {
            right = new TreeNode(array[i + 1]);
            if (node) {
                node.right = right;
            }
            q.push(right);
        }

    }

    return root;
}