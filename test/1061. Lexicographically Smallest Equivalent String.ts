import { expect } from 'chai';

class DSU {
    unionFind: number[];

    constructor() {
        this.unionFind = [];
        for (let i = 0; i < 26; i++) {
            this.unionFind.push(i);
        }
    }

    find(c: string): number {
        const i = c.charCodeAt(0) - 'a'.charCodeAt(0);
        let p = i;
        while (this.unionFind[p] !== p) {
            p = this.unionFind[p];
        }
        this.unionFind[i] = p;
        return p;
    }

    union(a: string, b: string) {
        const pa = this.find(a);
        const pb = this.find(b);
        if (pa > pb) {
            this.unionFind[pa] = pb;
        } else {
            this.unionFind[pb] = pa;
        }
    }

    findChar(c: string): string {
        const i = this.find(c);
        return String.fromCharCode('a'.charCodeAt(0) + i);
    }
}

function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
    const dsu = new DSU();
    for (let i = 0; i < s1.length; i++) {
        dsu.union(s1[i], s2[i]);
    }

    const ans: string[] = [];
    for (const c of baseStr) {
        ans.push(dsu.findChar(c));
    }

    return ans.join('');
}

function test(s1: string, s2: string, baseStr: string, expected: string) {
    const actual = smallestEquivalentString(s1, s2, baseStr);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1061. Lexicographically Smallest Equivalent String', () => {
    it('1061. 1', () => {
        test('parker', 'morris', 'parser', 'makkek');
    });
    it('1061. 2', () => {
        test('hello', 'world', 'hold', 'hdld');
    });
    it('1061. 3', () => {
        test('leetcode', 'programs', 'sourcecode', 'aauaaaaada');
    });
});

/*
Runtime
75 ms
Beats
100%
*/
