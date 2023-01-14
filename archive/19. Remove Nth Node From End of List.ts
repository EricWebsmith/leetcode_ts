import { expect } from 'chai';
import ListNode from '../models/list_node';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const prehead = new ListNode(-1);
    prehead.next = head;

    let fast: ListNode | null = prehead;
    let slow: ListNode | null = prehead;

    let index = 0;
    while (fast) {
        fast = fast.next;
        if (index > n && slow) {
            slow = slow.next;
        }
        index++;
    }

    if (slow && slow.next) {
        slow.next = slow?.next?.next;
    }

    return prehead.next;
}

function test(headArr: number[], n: number, expected: number[]) {
    const head = ListNode.fromArray(headArr);
    const actualHead = removeNthFromEnd(head, n);
    const actual = ListNode.toArray(actualHead);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('19. Remove Nth Node From End of List', () => {
    it('19. 1', () => {
        test([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]);
    });
    it('19. 2', () => {
        test([1], 1, []);
    });
    it('19. 3', () => {
        test([1, 2], 1, [1]);
    });
});
