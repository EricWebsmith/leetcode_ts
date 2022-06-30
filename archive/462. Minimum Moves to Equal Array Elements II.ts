import { expect } from "chai";
import * as _ from 'lodash';

function minMoves2(nums: number[]): number {
    const n = nums.length;
    nums.sort((a,b)=>a-b);
    const half = Math.floor(n/2) ;
    const median = nums[half];

    let ans = 0;
    for (let num of nums) {
        ans += Math.abs(median - num);
    }
    return ans;
}

function test(nums: number[], expected: number) {
    const actual = minMoves2(nums);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('462. Minimum Moves to Equal Array Elements II', () => {

    it('462. 1', () => { test([1, 2, 3], 2) });
    it('462. 2', () => { test([1, 10, 2, 9], 16) });
    it('462. 3', () => { test([1, 0, 0, 8, 6], 14) });
});

/*
Runtime: 89 ms, faster than 100.00% of TypeScript online submissions for Minimum Moves to Equal Array Elements II.
Memory Usage: 45.3 MB, less than 40.00% of TypeScript online submissions for Minimum Moves to Equal Array Elements II.
*/