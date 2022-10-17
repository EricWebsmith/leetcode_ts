import { expect } from 'chai';

function totalFruit(fruits: number[]): number {
    const baskets = new Map<number, number>();
    baskets.set(fruits[0], 1);
    let left = 0;
    let right = 0;
    let best = 1;
    while (right < fruits.length) {
        if (baskets.size <= 2) {
            best = Math.max(best, right - left + 1);
            right++;
            if (right === fruits.length) {
                break;
            }

            const rightCount = baskets.get(fruits[right]) ?? 0;
            baskets.set(fruits[right], rightCount + 1);
        } else {
            const leftCount = baskets.get(fruits[left]) ?? 0;
            if (leftCount === 1) {
                baskets.delete(fruits[left]);
            } else {
                baskets.set(fruits[left], leftCount - 1);
            }
            left++;
        }
    }
    return best;
}

function test(fruits: number[], expected: number) {
    const actual = totalFruit(fruits);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('904. Fruit Into Baskets', () => {
    it('904. 1', () => {
        test([1, 2, 1], 3);
    });

    it('904. 2', () => {
        test([0, 1, 2, 2], 3);
    });

    it('904. 3', () => {
        test([1, 2, 3, 2, 2], 4);
    });

    it('904. 4', () => {
        test([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4], 5);
    });
});

/*
Runtime
141 ms
Beats
87.30%
*/
