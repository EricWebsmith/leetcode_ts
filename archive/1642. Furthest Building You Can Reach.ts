
import { expect } from "chai";
import * as _ from 'lodash';

function findMaxAndIndex(array: number[]): [number, number] {
    let index = 0;
    let maxValue = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > maxValue) {
            index = i;
            maxValue = array[i];
        }
    }
    return [index, maxValue];
}

// firstly, fill all gaps with breaks.
// secondly, find the greatest gap, 
//   if it is greater than the next gap, 
//     replace the gap with a ladder and fill the next gap with breaks.
//   else
//     put a ladder at next gap.
// repeat step two until no ladders and breaks.
function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    const n = heights.length;
    let current = 0;
    // step 1 fill all gaps with breaks
    let gap = heights[1] - heights[0];
    const gaps = [];
    while (bricks >= gap && current < n - 1) {
        if (gap > 0) {
            bricks -= gap;
            gaps.push(gap);
        }
        current++;
        gap = heights[current + 1] - heights[current];

    }

    // step 2 take back bricks
    let maxGap = -1;
    while (current < n - 1) {
        if (maxGap === -1 && gaps.length > 0) {
            const [index, maxValue] = findMaxAndIndex(gaps);
            maxGap = maxValue;
            gaps.splice(index, 1);
        }
        const currentGap = heights[current + 1] - heights[current];
        if (bricks< currentGap && bricks< maxGap && ladders === 0) {
            return current;
        }

        if (currentGap <= 0) {
            current++;
            continue;
        }

        if ((currentGap <= maxGap || ladders ===0) && bricks >= currentGap) {
            bricks -= currentGap;
            gaps.push(currentGap);
            current++;
            continue;
        }

        if (ladders > 0 && currentGap >= maxGap) {
            ladders--;
            current++;
            continue;
        }

        if (ladders > 0 && currentGap < maxGap) {
            bricks += maxGap;
            maxGap = -1;
            bricks -= currentGap;
            gaps.push(currentGap);
            ladders--;
            current++;
            continue;
        }

        break;
    }
    return current;
}

function test(heights: number[], bricks: number, ladders: number, expected: number) {
    const actual = furthestBuilding(heights, bricks, ladders);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1642. Furthest Building You Can Reach', () => {

    it('1642. 1', () => { test([4, 2, 7, 6, 9, 14, 12], 5, 1, 4) });
    it('1642. 2', () => { test([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2, 7) });
    it('1642. 3', () => { test([14, 3, 19, 3], 17, 0, 3) });
    it('1642. 4', () => { test([14, 3, 19, 3], 0, 1, 3) });
    it('1642. 5', () => { test([14, 3, 19, 3, 15], 0, 1, 3) });
    it('1642. 6', () => { test([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 0, 1, 10) });
    it('1642. 7', () => { test([1,5,1,2,3,4,10000], 4, 1, 5) });
    it('1642. 8', () => { test([2,7,9,12], 5, 1, 3) });

});

/*
Runtime: 138 ms, faster than 100.00% of TypeScript online submissions for Furthest Building You Can Reach.
Memory Usage: 52.3 MB, less than 100.00% of TypeScript online submissions for Furthest Building You Can Reach.
*/
