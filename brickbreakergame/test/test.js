const starElement1 = document.getElementById('star');
const starElement2 = document.getElementById('wars');
starElement1.addEventListener('animationend', () => {
  starElement1.style.display = 'none';
  starElement2.style.display = 'none';
});
