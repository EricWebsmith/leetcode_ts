import { expect } from 'chai';

function twoSum(nums: number[], i: number, target: number, results: number[][]) {
  const n = nums.length;
  let left = i + 1;
  let right = n - 1;
  while (left < right) {
    const s = nums[left] + nums[right];
    if (s === target) {
      results.push([nums[i], nums[left], nums[right]]);
      left++;
      while (nums[left] === nums[left - 1]) {
        left++;
      }
    } else if (s > target) {
      right--;
    } else {
      left++;
    }
  }
}

function threeSum(nums: number[]): number[][] {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  const results: number[][] = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      break;
    }

    if (i === 0 || nums[i] != nums[i - 1]) {
      twoSum(nums, i, -nums[i], results);
    }
  }

  return results;
}

function test(nums: number[], expected: number[][]) {
  const actual = threeSum(nums);
  //   if (actual !== expected) {
  //     console.log(actual, expected);
  //   }
  expect(actual).to.be.eql(expected);
}

describe('15. 3Sum', () => {
  it('15. 1', () => {
    test(
      [-1, 0, 1, 2, -1, -4],
      [
        [-1, -1, 2],
        [-1, 0, 1],
      ]
    );
  });

  it('15. 2', () => {
    test([0, 1, 1], []);
  });

  it('15. 3', () => {
    test([0, 0, 0], [[0, 0, 0]]);
  });
});

/*
Runtime
157 ms
Beats
90.78%
*/
