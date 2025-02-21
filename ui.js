const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawBoard(board, currentPiece, x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 既存のブロックを描画
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) drawBlock(c, r, cell);
    });
  });

  // ゴーストピース（落下地点予測）
  let ghostY = getGhostY(board, currentPiece, x, y);
  currentPiece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.strokeRect((x + dx) * BLOCK_SIZE, (ghostY + dy) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    });
  });

  // 現在のブロックを描画
  currentPiece.shape.forEach((row, dy) => {
    row.forEach((value, dx) => {
      if (value) drawBlock(x + dx, y + dy, currentPiece.color);
    });
  });
}

function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function toggleInfo() {
  const infoBox = document.getElementById("infoBox");
  // 現在の状態をトグルする
  if (infoBox.style.display === "none" || infoBox.style.display === "") {
    infoBox.style.display = "block";  // 表示する
  } else {
    infoBox.style.display = "none";  // 非表示にする
  }
}
// 説明ボタン以外のすべてのボタンに対して音楽再生を試みるイベントを登録
document.querySelectorAll("button:not(#infoButton)").forEach(btn => {
  btn.addEventListener("click", tryPlayMusic);
});

function tryPlayMusic() {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic.paused) {
    bgMusic.play().catch(err => console.log("音楽自動再生がブロックされました:", err));
  }
}
