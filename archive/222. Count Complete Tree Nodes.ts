import { expect } from 'chai';
import { array2TreeNode } from '../models/binary_tree';

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function getLeftHeight(node: TreeNode | null): number {
    if (node === null) {
        return 0;
    }
    return getLeftHeight(node.left) + 1;
}

function getRightHeight(node: TreeNode | null): number {
    if (node === null) {
        return 0;
    }
    return getRightHeight(node.right) + 1;
}

function dfs(node: TreeNode | null): number {
    if (node == null) {
        return 0;
    }

    const leftHeight = getLeftHeight(node);
    const rightHeight = getRightHeight(node);

    if (leftHeight === rightHeight) {
        return 2 ** leftHeight - 1;
    }
    return dfs(node.left) + dfs(node.right) + 1;
}

function countNodes(root: TreeNode | null): number {
    return dfs(root);
}

function test(root_arr: (number | null)[], expected: number) {
    const root = array2TreeNode(root_arr);
    const actual = countNodes(root);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('222. Count Complete Tree Nodes', () => {
    it('222. 1', () => {
        test([1, 2, 3, 4, 5, 6], 6);
    });
    it('222. 2', () => {
        test([], 0);
    });
    it('222. 3', () => {
        test([1], 1);
    });
});

/*
Runtime
144 ms
Beats
88.37%
*/
