// Getting reference to the paddle element
let bird = document.querySelector(".paddle");

// Getting bird element properties
let bird_props = bird.getBoundingClientRect();
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
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    //play();
  }
});

// Add movment key detection of paddle
let paddle = bird
      x = paddle.offsetLeft,
  document.addEventListener("keydown", (e) => {
    var pos = x
    if (e.key == "ArrowLeft" || e.key == "a") {
      console.log("testLeft");
      id = setInterval(frame, 2);
      function frame() {
        if (pos == 0 ) {
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
        if (pos == 2100) {
          clearInterval(id);
          x = pos
        } else {
        pos++; 
        paddle.style.left = pos + 'px'; 
      }
    } 
  }
})
