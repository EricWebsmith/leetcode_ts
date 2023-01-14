import { expect } from 'chai';
import { array2TreeNode, TreeNode } from '../models/binary_tree';

function dfs_sum(node: TreeNode | null): number {
    if (node == null) {
        return 0;
    }

    return node.val + dfs_sum(node.left) + dfs_sum(node.right);
}

function maxProduct(root: TreeNode | null): number {
    const s = dfs_sum(root);

    let maxProduct = 0;
    function dfs_product(node: TreeNode | null): number {
        if (node == null) {
            return 0;
        }
        const subTreeSum = node.val + dfs_product(node.left) + dfs_product(node.right);
        const product = ((s - subTreeSum) * subTreeSum) % 1000000007;
        maxProduct = Math.max(maxProduct, product);
        return subTreeSum;
    }
    dfs_product(root);
    return maxProduct;
}

function test(rootArr: (number | null)[], expected: number) {
    const root = array2TreeNode(rootArr);
    const actual = maxProduct(root);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1339. Maximum Product of Splitted Binary Tree', () => {
    it('1339. 1', () => {
        test([1, 2, 3, 4, 5, 6], 110);
    });
    it('1339. 2', () => {
        test([1, null, 2, 3, 4, null, null, 5, 6], 90);
    });
});

/*
Runtime
265 ms
Beats
66.67%
*/
