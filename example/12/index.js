const button = document.querySelector('.button')
button.addEventListener('mousedown', () => {
  button.classList.add('active')
})

button.addEventListener('mouseup', () => {
  button.classList.remove('active')
})
button.addEventListener('mouseleave', () => {
  button.classList.remove('active')
})
