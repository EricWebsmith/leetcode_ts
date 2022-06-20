import { expect } from "chai";
import * as _ from 'lodash';

function removeVowels(s: string): string {
    return s.replace(/[aeiou]/g, '');
}

function test(s: string, expected: string) {
    const actual = removeVowels(s);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('1119. Remove Vowels from a String', () => {

    it('1119. 1', () => {test("leetcodeisacommunityforcoders", "ltcdscmmntyfrcdrs")});
    it('1119. 2', () => {test("aeiou", "")});    
});

/*
Runtime: 63 ms, faster than 92.31% of TypeScript online submissions for Remove Vowels from a String.
Memory Usage: 43.5 MB, less than 30.77% of TypeScript online submissions for Remove Vowels from a String.
*/