import { expect } from 'chai';

function hammingWeight(n: number): number {
    let ans = 0;
    while (n > 0) {
        n &= n - 1;
        ans++;
    }
    return ans;
}

function test(n: number, expected: number) {
    const actual = hammingWeight(n);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('191. Number of 1 Bits', () => {
    it('191. 1', () => {
        test(11, 3);
    });
    it('191. 2', () => {
        test(128, 1);
    });
    it('191. 3', () => {
        test(2 ** 32 - 1 - 2, 31);
    });
    it('191. 4', () => {
        test(32, 1);
    });
});
