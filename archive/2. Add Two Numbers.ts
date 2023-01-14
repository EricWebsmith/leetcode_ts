import { expect } from 'chai';
import ListNode from '../models/list_node';

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const preHead = new ListNode(-1);
    let current = preHead;

    let carry = 0;
    while (l1 != null || l2 != null) {
        let value = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
        if (value >= 10) {
            value = value % 10;
            carry = 1;
        } else {
            carry = 0;
        }

        const newCurrent = new ListNode(value);
        current.next = newCurrent;
        current = newCurrent;

        if (l1 != null) {
            l1 = l1.next;
        }

        if (l2 != null) {
            l2 = l2.next;
        }
    }

    if (carry === 1) {
        current.next = new ListNode(1);
    }

    return preHead.next;
}

function test(l1arr: number[], l2arr: number[], expected: number[]) {
    const l1 = ListNode.fromArray(l1arr);
    const l2 = ListNode.fromArray(l2arr);
    const actualHead = addTwoNumbers(l1, l2);
    const actual = ListNode.toArray(actualHead);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('2. Add Two Numbers', () => {
    it('2. 1', () => {
        test([2, 4, 3], [5, 6, 4], [7, 0, 8]);
    });
    it('2. 2', () => {
        test([0], [0], [0]);
    });
    it('2. 3', () => {
        test([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1]);
    });
});
