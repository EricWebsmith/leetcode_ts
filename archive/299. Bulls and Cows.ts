
import { expect } from "chai";

function getHint(secret: string, guess: string): string {
    const n = secret.length;
    let bulls = 0;
    let cows = 0;
    const secretMap = new Map<number, number>();
    const guessMap = new Map<number, number>();
    for (let i=0;i<n;i++) {
        if (secret[i] === guess[i]) {
            bulls++
        } else {
            const secretDigit = secret.charCodeAt(i) - '0'.charCodeAt(0);
            secretMap.set(secretDigit, (secretMap.get(secretDigit)??0)+1);
            const guessDigit = guess.charCodeAt(i) - '0'.charCodeAt(0);
            guessMap.set(guessDigit, (guessMap.get(guessDigit)??0)+1);
        }
    }

    for (let i=0;i<=9;i++) {
        cows+=Math.min(secretMap.get(i)??0, guessMap.get(i)??0);
    }

    return `${bulls}A${cows}B`;
}

function test(secret: string, guess: string, expected:  string) {
    const actual =  getHint (secret,  guess);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('299. Bulls and Cows', () => {

    it('299. 1', () => {test("1807",  "7810", "1A3B")});
    it('299. 2', () => {test("1123",  "0111", "1A1B")});    
});

/*
Runtime: 69 ms, faster than 100.00% of TypeScript online submissions for Bulls and Cows.
Memory Usage: 46.4 MB, less than 72.00% of TypeScript online submissions for Bulls and Cows.
*/