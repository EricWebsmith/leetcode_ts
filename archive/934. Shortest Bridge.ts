import { expect } from 'chai';

function shortestBridge(grid: number[][]): number {
    const n = grid.length;
    // Step 1. find island 1
    // Used a function because of double loop.

    let q: number[][] = [];
    const dirs = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    function dfs(r: number, c: number): void {
        if (r < 0 || r == n || c < 0 || c == n || grid[r][c] != 1) {
            return;
        }

        grid[r][c] = 2;
        q.push([r, c]);

        for (const [dr, dc] of dirs) {
            dfs(r + dr, c + dc);
        }
    }

    function findIsland(): void {
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (grid[r][c] === 1) {
                    dfs(r, c);
                    return;
                }
            }
        }
    }

    findIsland();

    // Step 2. Enlarge the first island until reaching the second.
    let bridge = 0;

    while (q.length > 0) {
        const l = q.length;
        for (let i = 0; i < l; i++) {
            const [r, c] = q.shift() ?? [];
            for (const [dr, dc] of dirs) {
                const new_r = r + dr;
                const new_c = c + dc;
                if (new_r < 0 || new_r == n || new_c < 0 || new_c == n) {
                    continue;
                }

                if (grid[new_r][new_c] === 2) {
                    continue;
                }

                if (grid[new_r][new_c] === 1) {
                    return bridge;
                }

                q.push([new_r, new_c]);
                grid[r][c] = 2;
            }
        }
        bridge++;
    }

    return -1;
}

function test(grid: number[][], expected: number) {
    const actual = shortestBridge(grid);
    if (actual !== expected) {
        console.log(actual, expected);
    }
    expect(actual).to.be.eql(expected);
}

describe('934. Shortest Bridge', () => {
    it('934. 1', () => {
        test(
            [
                [0, 1],
                [1, 0],
            ],
            1
        );
    });

    it('934. 2', () => {
        test(
            [
                [0, 1, 0],
                [0, 0, 0],
                [0, 0, 1],
            ],
            2
        );
    });

    it('934. 3', () => {
        test(
            [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
            ],
            1
        );
    });

    it('934. 4', () => {
        test(
            [
                [0, 0, 0, 1, 1],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 0, 1],
                [0, 0, 1, 1, 0],
            ],
            1
        );
    });
});
