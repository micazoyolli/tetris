import '../styles/main.scss';
import { I, J, L, O, S, T, Z } from './tetrominoes';
import { createBoard, ROW, COL, SQ, VACANT } from './board';
import { drawBoard, drawNext, showGameOver } from './renderer';
import { Piece } from './piece';

const canvas = document.getElementById('tetris') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const nextCanvas = document.getElementById('next-piece') as HTMLCanvasElement;
const nextCtx = nextCanvas.getContext('2d')!;
const scoreEl = document.getElementById('score')!;
const linesEl = document.getElementById('lines')!;
const levelEl = document.getElementById('level')!;

const PIECES = [
  [Z, '#FF4136'],
  [S, '#2ECC40'],
  [T, '#B10DC9'],
  [O, '#FFDC00'],
  [L, '#FF851B'],
  [I, '#0074D9'],
  [J, '#7FDBFF']
];

let board = createBoard();
let p: Piece;
let nextP: Piece;
let score = 0;
let lines = 0;
let level = 1;
let gameOver = false;
let dropStart = 0;
const baseSpeed = 500;

function randomPiece(): Piece {
  const r = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

function updateInfo() {
  scoreEl.innerText = score.toString();
  linesEl.innerText = lines.toString();
  levelEl.innerText = level.toString();
}

function drop() {
  const now = Date.now();
  if (now - dropStart > baseSpeed / level) {
    p.moveDown(ctx, board, () => {
      let topReached = false;

      p.activeTetromino.forEach((row, r) => {
        row.forEach((cell, c) => {
          if (!cell) return;

          const newY = p.y + r;
          const newX = p.x + c;

          if (newY < 0) {
            // La pieza llegó al top del tablero
            topReached = true;
          } else {
            board[newY][newX] = p.color;
          }
        });
      });

      if (topReached) {
        gameOver = true;
        drawBoard(ctx, board, SQ); // Asegura dibujar el último estado
        showGameOver(ctx, canvas); // Muestra el mensaje
        return; // Detenemos el loop
      }

      // Checar y eliminar líneas completas
      for (let r = 0; r < ROW; r++) {
        if (board[r].every(cell => cell !== VACANT)) {
          board.splice(r, 1);
          board.unshift(Array(COL).fill(VACANT));
          score += 10;
          lines++;
          level = Math.floor(lines / 10) + 1;
        }
      }

      drawBoard(ctx, board, SQ);
      updateInfo();

      // Generar la nueva pieza
      p = nextP;
      nextP = randomPiece();
      drawNext(nextCtx, nextCanvas, nextP.activeTetromino, nextP.color);
    });

    dropStart = now;
  }

  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

function startGame() {
  board = createBoard();
  drawBoard(ctx, board, SQ);
  p = randomPiece();
  nextP = randomPiece();
  drawNext(nextCtx, nextCanvas, nextP.activeTetromino, nextP.color);
  score = 0;
  lines = 0;
  level = 1;
  gameOver = false;
  updateInfo();
  dropStart = Date.now();
  drop();
}

document.getElementById('play')?.addEventListener('click', () => startGame());
document.getElementById('pause')?.addEventListener('click', () => {
  gameOver = !gameOver;
  if (!gameOver) drop();
});
document.getElementById('restart')?.addEventListener('click', () => location.reload());

['left', 'right', 'rotate', 'down'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', () => {
    if (id === 'left') p.moveLeft(ctx, board);
    else if (id === 'right') p.moveRight(ctx, board);
    else if (id === 'rotate') p.rotate(ctx, board);
    else if (id === 'down') p.moveDown(ctx, board, () => {});
    dropStart = Date.now();
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') p.moveLeft(ctx, board);
  else if (e.key === 'ArrowRight') p.moveRight(ctx, board);
  else if (e.key === 'ArrowUp') p.rotate(ctx, board);
  else if (e.key === 'ArrowDown') p.moveDown(ctx, board, () => {});
  dropStart = Date.now();
});