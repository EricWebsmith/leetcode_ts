
import { expect } from "chai";
import * as _ from 'lodash';

function decode(encoded: number[], first: number): number[] {
    const ans: number[] = new Array<number>();
    ans.push(first);
    for (let i = 0; i < encoded.length; i++) {
        ans.push(ans[i] ^ encoded[i]);
    }
    return ans;
}

function test(encoded: number[], first: number, expected: number[]) {
    const actual = decode(encoded, first);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1720. Decode XORed Array', () => {

    it('1720. 1', () => { test([1, 2, 3], 1, [1, 0, 2, 1]) });
    it('1720. 2', () => { test([6, 2, 7, 3], 4, [4, 2, 0, 7, 4]) });
    it('1720. 2', () => { test([6], 1, [1,7]) });
});

/*
Runtime: 99 ms, faster than 96.55% of TypeScript online submissions for Decode XORed Array.
Memory Usage: 49.9 MB, less than 6.90% of TypeScript online submissions for Decode XORed Array.
*/