
import { expect } from "chai";

function getMax(cuts: number[], length: number) {
    let previous = 0;
    let ans = 0;
    for (let i = 0; i < cuts.length; i++) {
        ans = Math.max(ans, cuts[i] - previous);
        previous = cuts[i];
    }
    ans = Math.max(ans, length - previous);
    return ans;
}

function maxArea(h: number, w: number, horizontalCuts: number[], verticalCuts: number[]): number {
    horizontalCuts.sort((a, b)=>a-b)
    verticalCuts.sort((a, b)=>a-b)
    const maxH = getMax(horizontalCuts, h);
    const maxW = getMax(verticalCuts, w);
    return Number(BigInt(maxH) * BigInt(maxW) % BigInt(1000000007));
}

function test(h: number, w: number, horizontalCuts: number[], verticalCuts: number[], expected: number) {
    const actual = maxArea(h, w, horizontalCuts, verticalCuts);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts', () => {

    it('1465. 1', () => { test(5, 4, [1, 2, 4], [1, 3], 4) });
    it('1465. 2', () => { test(5, 4, [3, 1], [1], 6) });
    it('1465. 3', () => { test(5, 4, [3], [3], 9) });
    it('1465. 4', () => { test(1000000000, 1000000000, [2], [2], 81) });
});

/*
Runtime: 140 ms, faster than 83.33% of TypeScript online submissions for Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts.
Memory Usage: 51.5 MB, less than 100.00% of TypeScript online submissions for Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts.
*/