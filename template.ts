
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

*/