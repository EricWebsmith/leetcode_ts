
import { expect } from "chai";
import * as _ from 'lodash';

function minPartitions(n: string): number {
    let ans = 1;
    for (const c of n) {
        const num = +c;
        if (num === 9) { return 9; }
        if (num > ans) {
            ans = +c;
        }
    }
    return ans;
}

function test(n: string, expected: number) {
    const actual = minPartitions(n);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1689. Partitioning Into Minimum Number Of Deci-Binary Numbers', () => {

    it('1689. 1', () => { test("32", 3) });
    it('1689. 2', () => { test("82734", 8) });
    it('1689. 3', () => { test("27346209830709182346", 9) });
});

/*
Runtime: 88 ms, faster than 94.44% of TypeScript online submissions for Partitioning Into Minimum Number Of Deci-Binary Numbers.
Memory Usage: 47.1 MB, less than 77.78% of TypeScript online submissions for Partitioning Into Minimum Number Of Deci-Binary Numbers.
*/