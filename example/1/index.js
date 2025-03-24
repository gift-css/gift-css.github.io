const button = document.querySelector('.button')

let runState = false
button.addEventListener('click', () => {
  if (runState) {
    return
  }
  button.classList.add('active')
  runState = true
  setTimeout(() => {
    button.classList.remove('active')
    runState = false
  }, 5000)
})
