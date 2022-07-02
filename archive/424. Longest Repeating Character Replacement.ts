
import { expect } from "chai";

function characterReplacement(s: string, k: number): number {
    const n = s.length;
    const countMap = new Map<string, number>();
    let res = 0;

    let l = 0;
    let maxf = 0;
    for (let r = 0; r < n; r++) {
        const c = s[r];
        const currentCount = (countMap.get(c) ?? 0) + 1;
        countMap.set(c, currentCount);
        maxf = Math.max(maxf, currentCount);

        while (r - l + 1 - maxf > k) {
            countMap.set(s[l], (countMap.get(s[l]) ?? 0) - 1);
            l += 1;
        }

        res = Math.max(res, r - l + 1);
    }

    return res;
}


function test(s: string, k: number, expected: number) {
    const actual = characterReplacement(s, k);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('424. Longest Repeating Character Replacement', () => {

    it('424. 1', () => { test("ABAB", 2, 4) });
    it('424. 2', () => { test("AABABBA", 1, 4) });
    it('424. 3', () => { test("KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF", 4, 7) });
});


/*
Runtime: 83 ms, faster than 98.25% of TypeScript online submissions for Longest Repeating Character Replacement.
Memory Usage: 43.8 MB, less than 83.77% of TypeScript online submissions for Longest Repeating Character Replacement.
*/