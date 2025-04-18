let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;
let mode = ""; // 'ai' or 'player'

// Font Awesome Icons as Strings
const X_ICON = '<i class="fas fa-times" style="color: #e91e63;"></i>';
const O_ICON = '<i class="far fa-circle" style="color: #3f51b5;"></i>';

function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById("mode-selection").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("status").textContent = "Player X's turn";

  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleClick);
  });

  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || isGameOver) return;
  if (mode === "ai" && currentPlayer !== "X") return;

  makeMove(index, currentPlayer);

  if (!isGameOver && mode === "ai") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = document.querySelector(`.cell[data-index='${index}']`);
  cell.innerHTML = player === "X" ? X_ICON : O_ICON;
  cell.classList.add("taken");

  if (checkWin(player)) {
    document.getElementById("status").textContent = `🎉 Player ${player} wins!`;
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "🤝 It's a tie!";
    isGameOver = true;
    return;
  }

  currentPlayer = player === "X" ? "O" : "X";
  document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;
}

function aiMove() {
  if (isGameOver) return;

  const emptyIndices = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");
}

function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("status").textContent = "Player X's turn";

  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerHTML = "";
    cell.classList.remove("taken");
  });
}

function goBack() {
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("mode-selection").classList.remove("hidden");
}
