const starElement1 = document.getElementById('star');
const starElement2 = document.getElementById('wars');
starElement1.addEventListener('animationend', () => {
  starElement1.style.display = 'none';
  starElement2.style.display = 'none';
});

const game = document.getElementById('game-container')
const intro = document.getElementById('containercover')
//game.addEventListener('')
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    game.style.visibility = 'visible'; 
    intro.style.visibility = 'hidden';
  } 
});