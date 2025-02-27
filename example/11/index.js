const button = document.querySelector('.button')
button.addEventListener('click', () => {
  console.log()
  if (Array.from(button.classList).includes('active')) {
    button.classList.remove('active')
  } else {
    button.classList.add('active')
  }
})
