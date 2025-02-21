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
let gameInterval = setInterval(moveDown, 500);  // ゲームループを管理

function moveDown() {
  if (gameOver) return; // ゲームオーバーなら何もしない

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
      clearInterval(gameInterval); // ゲームループを停止
      alert("ゲームオーバー！");
      return;
    }
  }
  drawBoard(board, currentPiece, x, y);
}
