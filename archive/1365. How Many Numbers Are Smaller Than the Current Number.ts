
import { expect } from "chai";
import _ from 'lodash';

function smallerNumbersThanCurrent(nums: number[]): number[] {
    const sorted = _.clone(nums);
    sorted.sort((a, b) => a - b);
    const map_ = new Map<number, number>();
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] !== sorted[i - 1]) {
            map_.set(sorted[i], i);
        }
    }

    return nums.map(n => map_.get(n) ?? 0);
}

function test(nums: number[], expected: number[]) {
    const actual = smallerNumbersThanCurrent(nums);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1365. How Many Numbers Are Smaller Than the Current Number', () => {

    it('1365. 1', () => { test([8, 1, 2, 2, 3], [4, 0, 1, 1, 3]) });
    it('1365. 2', () => { test([6, 5, 4, 8], [2, 1, 0, 3]) });
    it('1365. 2', () => { test([7, 7, 7, 7], [0, 0, 0, 0]) });
});

/*
Runtime: 82 ms, faster than 96.30% of TypeScript online submissions for How Many Numbers Are Smaller Than the Current Number.
Memory Usage: 44.7 MB, less than 90.12% of TypeScript online submissions for How Many Numbers Are Smaller Than the Current Number.
*/