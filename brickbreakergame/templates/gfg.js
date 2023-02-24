// Getting reference to the paddle element
let bird = document.querySelector(".paddle");

// Getting bird element properties
//let bird_props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

// Getting reference to the score element
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

// Setting initial game state to start
let game_state = "Start";

// Add an eventlistener for key presses
document.addEventListener("keydown", (e) => {
  // Start the game if enter key is pressed
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    game_state = "Play";
    // Start game loop
    gameLoop();
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    //play();
  }
});
function gameLoop(){
  updatePaddle();
}
let paddle = bird

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}


 // Update paddle
 function updatePaddle() {
  // Update paddle position
  paddle.x += paddle.dx;

  // Keep paddle within canvas bounds
  if (paddle.x < 0) {
      paddle.x = 0;
  } else if (paddle.x + paddle.width > 2200 +"px") {
      paddle.x = (2200 + "px") - paddle.width;
  }
}


  // Handle keyboard input
  document.addEventListener('keydown', function (event) {
    if (event.key === 37) {
        paddle.dx = -5;
    } else if (event.key === 39) {
        paddle.dx = 5;
    }
});
document.addEventListener('keyup', function (event) {
    if (event.key === 37 || event.key === 39) {
        paddle.dx = 0;
    }
});


/*
// Add movment key detection of paddle
let paddle = bird
      x = paddle.offsetLeft
  document.addEventListener("keydown", (e) => {
    document.addEventListener("keyup", (r) =>{
    var pos = x
    if (e.key == "ArrowLeft" || e.key == "a") {
      console.log("testLeft");
      id = setInterval(frame, 2);
      function frame() {
        if (pos == 0|| r.key == "ArrowRight" ) {
          clearInterval(id);
          x = pos
        } else {
        pos--; 
        paddle.style.left = pos + 'px'; 
      }
    }
    }
    if (e.key == "ArrowRight" || e.key == "d") {
      console.log("testRight");
      id = setInterval(frame, 1);
      function frame() {
        let width = screen.width
        if (pos == (width - 150)|| r.key == "ArrowLeft") {
          clearInterval(id);
          x = pos
        } else {
        pos++; 
        paddle.style.left = pos + 'px'; 
      }
    } 
  }
})
})
*/
