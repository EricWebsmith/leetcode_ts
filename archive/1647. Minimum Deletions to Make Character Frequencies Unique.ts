
import { expect } from "chai";
import * as _ from 'lodash';

class Count {
    char: string = '';
    times: number = 0;
}

function minDeletions(s: string): number {
    const counts: Count[] = new Array<Count>();
    for (const c of 'abcdefghijklmnopqrstuvwxyz') {
        const count = new Count();
        count.char = c;
        count.times = 0;
        counts.push(count);
    }

    for (const c of s) {
        const index = c.charCodeAt(0) - 'a'.charCodeAt(0)
        counts[index].times++;
    }

    counts.sort((a, b) => b.times - a.times);
    let previousTimes = counts[0].times;
    let ans = 0;
    for (let i = 1; i < counts.length; i++) {
        if (counts[i].times === 0) {
            break;
        }

        if (previousTimes === 0) {
            ans += counts[i].times;
            continue;
        }

        if (counts[i].times >= previousTimes) {
            ans += counts[i].times - previousTimes + 1;
            counts[i].times = previousTimes - 1;
        }

        previousTimes = counts[i].times;
    }

    return ans;
}

function test(s: string, expected: number) {
    const actual = minDeletions(s);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1647. Minimum Deletions to Make Character Frequencies Unique', () => {

    it('1647. 1', () => { test("aab", 0) });
    it('1647. 2', () => { test("aaabbbcc", 2) });
    it('1647. 3', () => { test("ceabaacb", 2) });
    it('1647. 4', () => { test("bbcebab", 2) });
});

/*
Runtime: 106 ms, faster than 89.66% of TypeScript online submissions for Minimum Deletions to Make Character Frequencies Unique.
Memory Usage: 49.7 MB, less than 24.14% of TypeScript online submissions for Minimum Deletions to Make Character Frequencies Unique.
*/