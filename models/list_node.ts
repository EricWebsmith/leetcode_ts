export default class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }

    toString() {
        return `${this.val}`;
    }

    public static toArray(node: ListNode | null): number[] {
        if (this == null) {
            return [];
        }

        const arr = [];
        let current: ListNode | null = node;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }

        return arr;
    }

    public static fromArray(arr: number[]): ListNode | null {
        if (arr.length === 0) {
            return null;
        }

        const head = new ListNode(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            const newNode = new ListNode(arr[i]);
            current.next = newNode;
            current = current.next;
        }

        return head;
    }
}
