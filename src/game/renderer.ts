export function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
  ctx.strokeStyle = '#333';
  ctx.strokeRect(x * size, y * size, size, size);
}

export function drawBoard(ctx: CanvasRenderingContext2D, board: string[][], size: number) {
  board.forEach((row, r) => row.forEach((color, c) => drawSquare(ctx, c, r, size, color)));
}

export function drawNext(nextCtx: CanvasRenderingContext2D, nextCanvas: HTMLCanvasElement, piece: number[][], color: string) {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  const cellSize = 20;
  const cols = piece[0].length;
  const rows = piece.length;
  const offsetX = (nextCanvas.width - cols * cellSize) / 2;
  const offsetY = (nextCanvas.height - rows * cellSize) / 2 + 5;

  piece.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      nextCtx.fillStyle = color;
      nextCtx.fillRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
      nextCtx.strokeStyle = '#333';
      nextCtx.strokeRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize, cellSize);
    }
  }));
}

export function showGameOver(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  ctx.fillStyle = '#FF4136';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 + 10);
}