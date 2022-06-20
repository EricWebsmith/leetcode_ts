import { expect } from "chai";
import { TreeNode, treeNode2Array, array2TreeNode } from '../models/binary_tree'

function checkTree(root: TreeNode | null): boolean {
    return root?.val === (root?.left?.val ?? 0) + (root?.right?.val ?? 0);
}

function test(rootArray: (number | null)[], expected: boolean) {
    const root = array2TreeNode(rootArray);
    const actual = checkTree(root);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('2236. Root Equals Sum of Children', () => {
    it('2236. 1', () => { test([10, 4, 6], true) });
    it('2236. 2', () => { test([5, 3, 1], false) });
});

/*
Runtime: 75 ms, faster than 87.40% of TypeScript online submissions for Root Equals Sum of Children.
Memory Usage: 45 MB, less than 28.57% of TypeScript online submissions for Root Equals Sum of Children.
*/