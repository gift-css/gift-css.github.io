const button = document.querySelector('.button')
const paysWords = document.querySelectorAll('.pay span')
const canceledWords = document.querySelectorAll('.canceled span')
const canceled = document.querySelector('.canceled')

function init () {
  paysWords.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
  canceledWords.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })
}
init()

let active = false

button.addEventListener('click', () => {
  if (!active) {
    active = true
    button.classList.add('active')

    // reset
    setTimeout(() => {
      button.classList.remove('active')
      active = false
    }, 4000)
  }
})
