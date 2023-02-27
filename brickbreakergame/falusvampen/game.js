// DOM elements
const gameScreen = document.getElementById("game-screen");
const score = document.getElementById("score");
const lives = document.getElementById("lives");
const timer = document.getElementById("timer");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const brick = document.getElementsByClassName("brick");

// Paddle movement
const paddleWidth = paddle.offsetWidth;
const gameScreenWidth = gameScreen.offsetWidth;

const minPaddleX = 3;
const maxPaddleX = gameScreenWidth - paddleWidth - 5;

let animationId;
let currentDirection = null;

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    movePaddleLeft();
  } else if (event.code === "ArrowRight") {
    movePaddleRight();
  }
});

document.addEventListener("keyup", function (event) {
  if (
    (event.code === "ArrowLeft" && currentDirection === "left") ||
    (event.code === "ArrowRight" && currentDirection === "right")
  ) {
    currentDirection = null;
    cancelAnimationFrame(animationId);
  }
});

function movePaddleLeft() {
  if (currentDirection !== "left") {
    currentDirection = "left";
    let currentPaddleX = paddle.offsetLeft;
    if (currentPaddleX > minPaddleX) {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(function moveLeft() {
        if (currentDirection === "left" && currentPaddleX > minPaddleX) {
          currentPaddleX -= 5;
          paddle.style.left = currentPaddleX + "px";
          // Ball follows paddle
          if (!ballReleased) {
            holdball();
          }
          animationId = requestAnimationFrame(moveLeft);
        } else {
          currentDirection = null;
        }
      });
    }
  }
}

function movePaddleRight() {
  if (currentDirection !== "right") {
    currentDirection = "right";
    let currentPaddleX = paddle.offsetLeft;
    if (currentPaddleX < maxPaddleX) {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(function moveRight() {
        if (currentDirection === "right" && currentPaddleX < maxPaddleX) {
          currentPaddleX += 5;
          paddle.style.left = currentPaddleX + "px";
          // Ball follows paddle
          if (!ballReleased) {
            holdball();
          }
          animationId = requestAnimationFrame(moveRight);
        } else {
          currentDirection = null;
        }
      });
    }
  }
}

// Ball movement
let ballReleased = false;

// Initial position of the ball

function holdball() {
  ball.style.left = paddle.offsetLeft + paddleWidth / 2 - 10 + "px";
  ball.style.top = paddle.offsetTop - 35 + "px";
}
holdball();

// Start the game with spacebar
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!ballReleased) {
      ballReleased = true;
      moveBall();
    }
  }
});
