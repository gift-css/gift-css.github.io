const button = document.querySelector('.button')
button.addEventListener('mousedown', () => {
  button.classList.add('active')
})

button.addEventListener('mouseup', () => {
  button.classList.remove('active')
})

// 添加鼠标离开事件监听
button.addEventListener('mouseleave', () => {
  button.classList.remove('active')
})
