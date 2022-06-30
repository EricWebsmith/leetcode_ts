
import { expect } from "chai";
import * as _ from 'lodash';

function binarySearch(arr: number[], target: number): number {
    const n = arr.length;
    let left = 0;
    let right = n - 1;
    while (left < right) {
        let mid = Math.round((left + right) / 2);
        if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }

    return right;
}

class TopVotedCandidate {
    persons: number[] = [];
    times: number[] = [];
    wins: number[] = [];

    constructor(persons: number[], times: number[]) {
        this.persons = persons;
        this.times = times;
        //this.wins = new Object();
        let zeros = 0;
        let ones = 0;
        const map_ = new Map<number, number>();
        let maxVote = 0;
        let previousWinner = 0;
        for (let person of persons) {
            const previous = map_.get(person)??0;
            map_.set(person, previous + 1);
            let maxAt = 0;
            let max = 0;
            for (const [k, v] of map_.entries()) {
                if (v>max) {
                    max = v;
                    maxAt = k;
                }
            }

            let currentWinner = 0;
            if (map_.get(person) === max) {
                currentWinner = person;
            } else if (map_.get(previousWinner) === max) {
                currentWinner = previousWinner;
            } else {
                currentWinner = maxAt;
            }
            this.wins.push(currentWinner);
            previousWinner = currentWinner;
        }
    }

    q(t: number): number {
        const index = binarySearch(this.times, t);
        return this.wins[index];
    }
}

/**
 * Your TopVotedCandidate object will be instantiated and called as such:
 * var obj = new TopVotedCandidate(persons, times)
 * var param_1 = obj.q(t)
 */


function test(actions: string[], params: Array<any>, expected: Array<any>) {
    const obj = new TopVotedCandidate(params[0][0], params[0][1]);
    for (let i = 1; i < actions.length; i++) {
        switch (actions[i]) {
            case 'q':
                expect(obj.q(params[i])).to.be.eql(expected[i]);
                break;
        }
    }
}

describe('911. Online Election', () => {

    it('911. 1', () => { test(["TopVotedCandidate", "q", "q", "q", "q", "q", "q"], [[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15], [24], [8]], [null, 0, 1, 1, 0, 0, 1]) });
    it('911. 2', () => { test(["TopVotedCandidate", "q", "q", "q", "q", "q", "q", "q", "q", "q", "q"], [[[0, 0, 0, 0, 1], [0, 6, 39, 52, 75]], [45], [49], [59], [68], [42], [37], [99], [26], [78], [43]], [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) });
    it('911. 3', () => { test(["TopVotedCandidate", "q", "q", "q", "q", "q", "q", "q", "q", "q", "q"], [[[0, 1, 2, 2, 1], [20, 28, 29, 54, 56]], [28], [53], [57], [29], [29], [28], [30], [20], [56], [55]], [null, 1, 2, 1, 2, 2, 1, 2, 0, 1, 2]) });
    it('911. 4', () => { test(["TopVotedCandidate","q","q","q","q","q","q","q","q","q","q"], [[[0,0,1,1,2],[0,67,69,74,87]],[4],[62],[100],[88],[70],[73],[22],[75],[29],[10]], [null,0,0,1,1,0,0,0,1,0,0]) });
});

/*
Runtime: 364 ms, faster than 83.33% of TypeScript online submissions for Online Election.
Memory Usage: 61.7 MB, less than 16.67% of TypeScript online submissions for Online
*/