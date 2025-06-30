export const ROW = 20;
export const COL = 10;
export const SQ = 30;
export const VACANT = '#1b1b1b';

export function createBoard() {
  return Array.from({ length: ROW }, () => Array(COL).fill(VACANT));
}