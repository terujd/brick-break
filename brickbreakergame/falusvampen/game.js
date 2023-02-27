// DOM elements
const gameScreen = document.getElementById("game-screen");
const score = document.getElementById("score");
const lives = document.getElementById("lives");
const timer = document.getElementById("timer");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const brick = document.getElementsByClassName("brick");
const grid = document.getElementsByClassName("grid");

// -----------------------------------------------Bricks------------------------------------------------
// Constants for brick dimensions and layout
const numCols = 9;
const numRows = 5;
const brickWidth = 40;
const brickHeight = 20;
const brickSpacing = 2;

function createBricks(levelData) {
  // Calculate the width of the grid based on the number of columns, brick width, and spacing
  const gridWidth = numCols * (brickWidth + brickSpacing) - brickSpacing;

  // Calculate the left position of the grid to center it on the screen
  const gridLeft = (gameScreen.clientWidth - gridWidth) / 2;

  // Set the style properties of the grid
  grid[0].style.width = gridWidth + "px";
  grid[0].style.left = gridLeft + "px";
  grid[0].style.top = gridLeft + "px";

  // Loop through each row and column of the level data
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Create a new brick element only if the value at that position is 1
      if (levelData[row][col] === 1) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
        brick.style.top = row * (brickHeight + brickSpacing) + "px";
        brick.style.left = col * (brickWidth + brickSpacing) + "px";
        grid[0].appendChild(brick);
      }
    }
  }
}
// -----------------------------------------------Levels------------------------------------------------

// Level 1

const level1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const levelData = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
];

createBricks(level1);

// -----------------------------------------------Paddle Movement------------------------------------------------

const paddleWidth = paddle.offsetWidth;
const gameScreenWidth = gameScreen.offsetWidth;
const gameScreenHeight = gameScreen.offsetHeight;

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

// -----------------------------------------------Ball Movement------------------------------------------------

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

let ballDirectionX = -1;
let ballDirectionY = -1;
let ballSpeed = 1;
let ballRadius = 10;

// Ball collision detection
function detectBallCollisions() {
  // ball x and y position from the center of the ball
  const ballX = ball.offsetLeft + 10;
  const ballY = ball.offsetTop + 10;

  // Ball hits the top
  if (ballY < 0) {
    ballDirectionY = 1;
    sound("tap");
  }
  // Ball hits the bottom
  // if (ballY > gameScreen.offsetHeight - 20) {
  if (ballY > gameScreen.offsetHeight) {
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
  // if (ballX > gameScreenWidth - 20) {
  if (ballX > gameScreenWidth) {
    ballDirectionX = -1;
    sound("tap");
  }
  // Ball hits the paddle
  if (
    ballX > paddle.offsetLeft &&
    ballX < paddle.offsetLeft + paddleWidth &&
    ballY > paddle.offsetTop
  ) {
    ballDirectionY = -1;
    sound("hit");
  }
  // Ball hits the brick
  detectBrickCollisions(ballX, ballY);
}

// Brick collision detection
function detectBrickCollisions(ballX, ballY) {
  for (let i = 0; i < brick.length; i++) {
    if (
      ballX + 20 > brick[i].offsetLeft &&
      ballX < brick[i].offsetLeft + brick[i].offsetWidth &&
      ballY + 20 > brick[i].offsetTop &&
      ballY < brick[i].offsetTop + brick[i].offsetHeight
    ) {
      ballDirectionY = 1;
      brick[i].style.display = "none";
      scoreCounter();
    }
  }
}

// Move the ball
function moveBall() {
  let ballX = ball.offsetLeft;
  let ballY = ball.offsetTop;
  if (ballReleased) {
    requestAnimationFrame(function () {
      detectBallCollisions();
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

// -----------------------------------------------Game mechanics------------------------------------------------

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
