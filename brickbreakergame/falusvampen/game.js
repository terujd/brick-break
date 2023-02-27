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
// Running the function here makes the ball always start in the middle of the paddle
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

let ballDirectionX = 1;
let ballDirectionY = -1;
let ballSpeed = 5;

function moveBall() {
  let ballX = ball.offsetLeft;
  let ballY = ball.offsetTop;
  if (ballReleased) {
    requestAnimationFrame(function () {
      // Ball hits the top
      if (ballY < 0) {
        ballDirectionY = 1;
        sound("tap");
      }
      // Ball hits the bottom
      if (ballY > gameScreen.offsetHeight - 20) {
        livesCounter();
        ballDirectionX = 1;
        ballDirectionY = -1;
        ballReleased = false;
      }
      // Ball hits the left
      if (ballX < 0) {
        ballDirectionX = 1;
        sound("tap");
      }
      // Ball hits the right
      if (ballX > gameScreenWidth - 20) {
        ballDirectionX = -1;
        sound("tap");
      }
      // Ball hits the paddle
      if (
        ballX + 20 > paddle.offsetLeft &&
        ballX < paddle.offsetLeft + paddleWidth &&
        ballY + 20 > paddle.offsetTop
      ) {
        // Play a sound from the music folder when the ball hits the paddle
        ballDirectionY = -1;
        sound("hit");
      }

      // Ball hits the brick
      for (let i = 0; i < brick.length; i++) {
        if (
          ballX + 20 > brick[i].offsetLeft &&
          ballX < brick[i].offsetLeft + brick[i].offsetWidth &&
          ballY + 20 > brick[i].offsetTop &&
          ballY < brick[i].offsetTop + brick[i].offsetHeight
        ) {
          ballDirectionY = 1;
          brick[i].style.display = "none";
          ballReleased = false;
          scoreCounter();
        }
      }
      // This makes the ball move
      ballX += ballDirectionX * ballSpeed;
      ballY += ballDirectionY * ballSpeed;
      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";
      moveBall();
    });
  } else {
    holdball();
  }
}

// Game mechanics

// Lives counter
function livesCounter() {
  // the lives counter is a string with a number in it "Lives: 3" so we need to split it and get the number
  let currentLives = parseInt(lives.innerHTML.split(" ")[1]);
  currentLives--;
  lives.innerHTML = "Lives: " + currentLives;
  if (currentLives === 0) {
    alert("Game over");
    document.location.reload();
  }
}

// Score counter
function scoreCounter() {
  let currentScore = parseInt(score.innerHTML.split(" ")[1]);
  currentScore++;
  score.innerHTML = "Score: " + currentScore;
  if (currentScore === brick.length) {
    alert("You won!");
    document.location.reload();
  }
}

// Sound effects and music
function sound(src) {
  let sound = new Audio("music/" + src + ".wav");
  sound.play();
}

// make sure that the sound effects and music are loaded before the game starts
window.addEventListener("load", function () {
  sound("tap");
  sound("hit");
});
