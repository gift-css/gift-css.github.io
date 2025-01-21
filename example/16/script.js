const button = document.querySelector('.button')
const paysWords = document.querySelectorAll('.pay span')
const canceledWords = document.querySelectorAll('.canceled span')
button.addEventListener('click', () => {
  paysWords.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
  canceledWords.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
  button.classList.add('active')
})

// reset
button.addEventListener('animationend', () => {
  setTimeout(() => {
    button.classList.remove('active')
  }, 3000)
})
