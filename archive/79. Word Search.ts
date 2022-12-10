import { expect } from 'chai';

function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    const visiting: boolean[][] = Array(rows);
    for (let row = 0; row < rows; row++) {
        visiting[row] = Array(cols).fill(false);
    }

    const dfs = (row: number, col: number, index: number): boolean => {
        if (row === -1 || row === rows || col === -1 || col === cols) {
            return false;
        }

        if (board[row][col] !== word[index] || visiting[row][col]) {
            return false;
        }

        if (index === word.length - 1) {return true; }

        visiting[row][col] = true;

        for (const [dr, dc] of [[1, 0], [0, 1], [-1, 0], [0, -1],]) {
            if (dfs(row + dr, col + dc, index + 1)) {
                return true;
            }
        }

        visiting[row][col] = false;
        return false;
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (dfs(row, col, 0)) { return true; }
        }
    }

    return false;
}

function test(board: string[][], word: string, expected: boolean) {
    const actual = exist(board, word);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('79. Word Search', () => {
    it('79. 1', () => {
        test(
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E'],
            ],
            'ABCCED',
            true
        );
    });

    it('79. 2', () => {
        test(
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E'],
            ],
            'SEE',
            true
        );
    });

    it('79. 3', () => {
        test(
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E'],
            ],
            'ABCB',
            false
        );
    });

    it('79. 4', () => {
        test(
            [
                ['A', 'B', 'C', 'E'],
                ['S', 'F', 'C', 'S'],
                ['A', 'D', 'E', 'E'],
            ],
            'AB',
            true
        );
    });
});

/*
Runtime
798 ms
Beats
60.32%
*/
