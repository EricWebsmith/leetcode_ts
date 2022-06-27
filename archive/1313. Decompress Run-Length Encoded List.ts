
import { expect } from "chai";
import * as _ from 'lodash';

function decompressRLElist(nums: number[]): number[] {
    const n = nums.length;
    const ans = [];
    for (let i = 0; i < n; i += 2) {
        for (let j=0;j<nums[i];j++) {
            ans.push(nums[i+1]);
        }
    }
    return ans;
}

function test(nums: number[], expected: number[]) {
    const actual = decompressRLElist(nums);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1313. Decompress Run-Length Encoded List', () => {
    it('1313. 1', () => { test([1, 2, 3, 4], [2, 4, 4, 4]) });
    it('1313. 2', () => { test([1, 1, 2, 3], [1, 3, 3]) });
});

/*
Runtime: 89 ms, faster than 95.35% of TypeScript online submissions for Decompress Run-Length Encoded List.
Memory Usage: 47.3 MB, less than 44.19% of TypeScript online submissions for Decompress Run-Length Encoded List.
*/