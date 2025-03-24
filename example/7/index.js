const button = document.querySelector('.button')
button.addEventListener('click', () => {
  button.classList.add('active')
})

button.addEventListener('animationend', () => {
  setTimeout(() => {
    button.classList.remove('active')
  }, 3000)
})
