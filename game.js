const ROWS = 20, COLS = 10, BLOCK_SIZE = 20;
const COLORS = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"];
const SHAPES = [
  [[1, 1, 1, 1]], [[1, 1, 1], [0, 1, 0]], [[1, 1, 1], [1, 0, 0]], 
  [[1, 1, 1], [0, 0, 1]], [[1, 1], [1, 1]], [[0, 1, 1], [1, 1, 0]], 
  [[1, 1, 0], [0, 1, 1]]
];

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPiece = getRandomPiece();
let x = 3, y = 0;
let gameOver = false;

function getRandomPiece() {
  let id = Math.floor(Math.random() * SHAPES.length);
  return { shape: SHAPES[id], color: COLORS[id] };
}

function canMove(px, py, shape) {
  return shape.every((row, dy) => row.every((value, dx) => {
    if (!value) return true;
    let newX = px + dx, newY = py + dy;
    if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
    return board[newY][newX] === 0;
  }));
}

function mergePiece() {
  currentPiece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) board[y + dy][x + dx] = currentPiece.color;
    });
  });
}

function getGhostY(board, piece, x, y) {
  let ghostY = y;
  while (canMove(x, ghostY + 1, piece.shape)) ghostY++;
  return ghostY;
}

function clearLines() {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(cell => cell !== 0)) { // 行がすべて埋まっている場合
      board.splice(r, 1);  // 行を削除
      board.unshift(Array(COLS).fill(0)); // 新しい空行を上に追加
      break;  // 1行だけ消去するため、ループを終了
    }
  }
}
function moveDown() {
  if (canMove(x, y + 1, currentPiece.shape)) {
    y++;
  } else {
    mergePiece();
    clearLines();
    currentPiece = getRandomPiece();
    x = 3;
    y = 0;
    if (!canMove(x, y, currentPiece.shape)) {
      gameOver = true;
      alert("ゲームオーバー！");
    }
  }
  drawBoard(board, currentPiece, x, y);
}

function moveLeft() { if (canMove(x - 1, y, currentPiece.shape)) x--; drawBoard(board, currentPiece, x, y); }
function moveRight() { if (canMove(x + 1, y, currentPiece.shape)) x++; drawBoard(board, currentPiece, x, y); }
function rotatePiece() { let rotated = currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i])).reverse(); if (canMove(x, y, rotated)) currentPiece.shape = rotated; drawBoard(board, currentPiece, x, y); }
function hardDrop() { while (canMove(x, y + 1, currentPiece.shape)) y++; moveDown(); }

setInterval(moveDown, 500);
