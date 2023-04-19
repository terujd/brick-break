const starElement1 = document.getElementById("star");
const starElement2 = document.getElementById("wars");

const all = document.getElementById("scroll-container");
const scroll = document.getElementById("scroll-text");
const startbtn = document.getElementById("start-game-btn");
const welcome = document.getElementById("welcome");

const start = document.getElementById("start");

start.style.visibility = "hidden";

all.style.visibility = "hidden";
startbtn.addEventListener("click", () => {
  scroll.classList.add("scroll-animation");
  starElement1.classList.add("star");
  starElement2.classList.add("wars");
  all.style.visibility = "visible";
  welcome.style.visibility = "hidden";
  // setTimeout(() => {
  //   start.style.visibility = "visible";
  // }, 70000);
});

starElement1.addEventListener("animationend", () => {
  starElement1.style.display = "none";
  starElement2.style.display = "none";
});

scroll.addEventListener("animationend", () => {
  start.style.visibility = "visible";
});

const game = document.getElementById("game-container");
const intro = document.getElementById("containercover");
//game.addEventListener('')
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    start.style.visibility = "hidden";
    all.style.visibility = "hidden";
    game.style.visibility = "visible";
    intro.style.visibility = "hidden";
  }
});
