const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const title = document.querySelector("h1");


let isCircleTurn = false;

const winningCombinations = [
  // Horizontais
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  // Verticais
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // Diagonais
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20]
];

const startGame = () => {
  isCircleTurn = false;
  board.classList.remove("circle");
  board.classList.add("x");
  winningMessage.classList.remove("show-winning-message");

  for (const cell of cellElements) {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = 'Empate!';
  } else {
    winningMessageTextElement.innerText = isCircleTurn ? 'O venceu!' : 'X venceu!';
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  board.classList.toggle("circle", isCircleTurn);
  board.classList.toggle("x", !isCircleTurn);
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  if (checkForWin(classToAdd)) {
    endGame(false);
  } else if (checkForDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
};

restartButton.addEventListener("click", startGame);

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  board.classList.remove("hidden");
  title.classList.remove("hidden");
  startGame();
});
