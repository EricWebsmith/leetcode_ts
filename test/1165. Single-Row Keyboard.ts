
import { expect } from "chai";
import * as _ from 'lodash';

function calculateTime(keyboard: string, word: string): number {
    const charDict: Map<string, number> = new Map<string, number>();
    for (let i=0;i<keyboard.length;i++) {
        charDict.set(keyboard[i], i);
    }

    let ans: number = 0;
    let previous: number = 0;
    for (let i=0;i<word.length;i++) {
        let current = charDict.get(word[i])??0;
        ans+= Math.abs(current - previous);
        previous = current;
    }

    return ans;
}

function test(keyboard: string, word: string, expected: number) {
    const actual = calculateTime(keyboard, word);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1165. Single-Row Keyboard', () => {

    it('1165. 1', () => { test("abcdefghijklmnopqrstuvwxyz", "cba", 4) });
    it('1165. 2', () => { test("pqrstuvwxyzabcdefghijklmno", "leetcode", 73) });
});

/*
Runtime: 79 ms, faster than 90.00% of TypeScript online submissions for Single-Row Keyboard.
Memory Usage: 45.1 MB, less than 15.00% of TypeScript online submissions for Single-Row Keyboard.
*/