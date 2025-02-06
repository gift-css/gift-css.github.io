const play = document.querySelector('.play');
play.addEventListener('click', () => {
  play.classList.add('active');
});

play.addEventListener('animationend', () => {
  play.classList.remove('active');
});
