
import { expect } from "chai";
import * as _ from 'lodash';

function minimumSum(num: number): number {
    const digits: number[] = [];
    while(digits.length<4) {
        digits.push(num % 10)
        num = Math.floor(num / 10);
    }
    digits.sort((a,b) => a - b);
    return digits[0] * 10 + digits[1] * 10 + digits[2] + digits[3];
}

function test(num: number, expected: number) {
    const actual = minimumSum(num);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('2160. Minimum Sum of Four Digit Number After Splitting Digits', () => {

    it('2160. 1', () => {test(2932, 52)});
    it('2160. 2', () => {test(4009, 13)});
});

/*
Runtime: 73 ms, faster than 80.30% of TypeScript online submissions for Minimum Sum of Four Digit Number After Splitting Digits.
Memory Usage: 42.4 MB, less than 98.48% of TypeScript online submissions for Minimum Sum of Four Digit Number After Splitting Digits.
*/