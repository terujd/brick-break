// DOM elements
const gameScreen = document.getElementById("game-screen");
const score = document.getElementById("score");
const lives = document.getElementById("lives");
const timer = document.getElementById("timer");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const brick = document.getElementsByClassName("brick");

// Set up event listeners for keyboard input
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    paddle.moveLeft();
  } else if (event.code === "ArrowRight") {
    paddle.moveRight();
  } else if (event.code === "Space") {
    if (gameOver) {
      restartGame();
    } else {
      togglePause();
    }
  }
});

