const button = document.querySelector('.button')
let active = false
button.addEventListener('click', () => {
  if (!active) {
    active = true
    button.classList.add('active')
  }
})

// reset
button.addEventListener('animationend', () => {
  setTimeout(() => {
    button.classList.remove('active')
  }, 3000)
})
