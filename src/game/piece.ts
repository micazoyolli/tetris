import { ROW, COL, VACANT } from './board';
import { drawSquare } from './renderer';

export class Piece {
  constructor(
    public tetromino: number[][][],
    public color: string,
    public tetrominoN = 0,
    public activeTetromino = tetromino[0],
    public x = 3,
    public y = -2
  ) {}

  fill(ctx: CanvasRenderingContext2D, color: string) {
    this.activeTetromino.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) drawSquare(ctx, this.x + c, this.y + r, 30, color);
      });
    });
  }

  draw(ctx: CanvasRenderingContext2D) { this.fill(ctx, this.color); }
  unDraw(ctx: CanvasRenderingContext2D) { this.fill(ctx, VACANT); }

  moveDown(ctx: CanvasRenderingContext2D, board: string[][], onLock: () => void) {
    if (!this.collision(0, 1, board)) {
      this.unDraw(ctx);
      this.y++;
      this.draw(ctx);
    } else {
      onLock();
    }
  }

  moveRight(ctx: CanvasRenderingContext2D, board: string[][]) {
    if (!this.collision(1, 0, board)) {
      this.unDraw(ctx);
      this.x++;
      this.draw(ctx);
    }
  }

  moveLeft(ctx: CanvasRenderingContext2D, board: string[][]) {
    if (!this.collision(-1, 0, board)) {
      this.unDraw(ctx);
      this.x--;
      this.draw(ctx);
    }
  }

  rotate(ctx: CanvasRenderingContext2D, board: string[][]) {
    const next = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, board, next)) kick = this.x > COL / 2 ? -1 : 1;
    if (!this.collision(kick, 0, board, next)) {
      this.unDraw(ctx);
      this.x += kick;
      this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
      this.activeTetromino = this.tetromino[this.tetrominoN];
      this.draw(ctx);
    }
  }

  collision(xOffset: number, yOffset: number, board: string[][], pattern = this.activeTetromino): boolean {
    return pattern.some((row, r) => row.some((cell, c) => {
      if (!cell) return false;
      const newX = this.x + c + xOffset;
      const newY = this.y + r + yOffset;
      if (newX < 0 || newX >= COL || newY >= ROW) return true;
      if (newY < 0) return false;
      return board[newY][newX] !== VACANT;
    }));
  }
}