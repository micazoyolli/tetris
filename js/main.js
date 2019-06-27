const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
const scoreElement = document.getElementById('score');

const ROW = 25;
const COL = COLUMN = 15;
const SQ = squareSize = 25;
const VACANT = '#1b1b1b';

// Draw Square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = '#0a0a0a';
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// Create board
let board = [];

for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// Draw board
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// Pieces and their colors
const PIECES = [
  [Z, '#9d0110'],
  [S, '#77d000'],
  [T, '#c59302'],
  [O, '#051a93'],
  [L, '#8d0b62'],
  [I, '#1daacf'],
  [J, '#e1923f']
];

// Generate random pieces (0 => 6)
function randomPiece() {
  let r = randomN = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

// The Object Piece
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // Control the pieces
  this.x = 3;
  this.y = -2;
}

// Fill function
Piece.prototype.fill = function(color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // Draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// Draw a piece to the board
Piece.prototype.draw = function() {
  this.fill(this.color);
};

// Undraw a piece
Piece.prototype.unDraw = function() {
  this.fill(VACANT);
};

// Move Down the piece
Piece.prototype.moveDown = function() {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  } else {
    // Lock the piece and generate a new one
    this.lock();
    p = randomPiece();
  }
};

// Move Right the piece
Piece.prototype.moveRight = function() {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

// Move Left the piece
Piece.prototype.moveLeft = function() {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

// Rotate the piece
Piece.prototype.rotate = function() {
  let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  let kick = 0;

  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL / 2) {
      // It's the right wall
      kick = -1; // Move piece to left
    } else {
      // It's the left wall
      kick = 1; // Move piece to right
    }
  }

  if (!this.collision(kick, 0, nextPattern)) {
    this.unDraw();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
};

let score = 0;

Piece.prototype.lock = function() {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // Skip the vacant squares
      if (!this.activeTetromino[r][c]) {
        continue;
      }
      // Pieces to lock on top = Game Over
      if (this.y + r < 0) {
        alert('Game Over');
        // Stop request animation frame
        gameOver = true;
        break;
      }
      // Lock the piece
      board[this.y + r][this.x + c] = this.color;
    }
  }

  // Remove full rows
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;

    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && (board[r][c] != VACANT);
    }

    if (isRowFull) {
      // If the row is full move down all the rows above it
      for (y = r; y > 1; y--) {
        for (c = 0; c < COL; c++) {
          board[y][c] = board[y - 1][c];
        }
      }

      // The top row board[0][..] has no row above it
      for (c = 0; c < COL; c++) {
        board[0][c] = VACANT;
      }

      // Increment the score
      score += 10;
    }
  }

  // Update the board
  drawBoard();

  // Update the score
  scoreElement.innerHTML = score;
}

// Collision function
Piece.prototype.collision = function(x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // If the square is empty skip it
      if (!piece[r][c]) {
        continue;
      }

      // Coordinates of the piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      // Conditions
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }

      // Skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }

      // Check if there is a locked piece alrady in place
      if (board[newY][newX] != VACANT) {
        return true;
      }
    }
  }

  return false;
};

// Control the piece
document.addEventListener('keydown', CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    p.moveDown();
  }
}

// Drop the piece every 1sec
let dropStart = Date.now();
let gameOver = false;

function drop() {
  let now = Date.now();
  let delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }

  if (!gameOver) {
    requestAnimationFrame(drop);
  }
}

drop();
