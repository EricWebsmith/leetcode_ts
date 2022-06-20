import { expect } from "chai";
import * as _ from 'lodash';

function pivotIndex(nums: number[]): number {
    const n = nums.length;
    if (n === 1) {
        return 0;
    }
    const left = [nums[0]];
    for (let i=1;i<n;i++) {
        left.push(left[i-1]+nums[i]);
    }

    const right = new Array<number>(n);
    right[n-1] = nums[n-1];
    for (let i=n-2;i>=0;i--) {
        right[i] = right[i+1]+nums[i];
    }

    if (right[1] === 0) {
        return 0;
    }

    for (let i=0;i<n-1;i++) {
        if (left[i-1] === right[i+1]) {
            return i;
        }
    }

    if (left[n-2] === 0) {
        return n-1;
    }

    return -1;
}

function test(nums: number[], expected: number) {
    const actual = pivotIndex(nums);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('724. Find Pivot Index', () => {

    it('724. 1', () => {test([1,7,3,6,5,6], 3)});
    it('724. 2', () => {test([1,2,3], -1)});    
    it('724. 3', () => {test([2,1,-1], 0)});
    it('724. 4', () => {test([0], 0)});
});

/*
Runtime: 85 ms, faster than 88.98% of TypeScript online submissions for Find Pivot Index.
Memory Usage: 47.7 MB, less than 7.87% of TypeScript online submissions for Find Pivot Index.
*/