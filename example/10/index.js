const button = document.querySelector('.button')
button.addEventListener('click', () => {
  // 如果按钮没有 active 类才执行
  if (!button.classList.contains('active')) {
    button.classList.add('active')
    // 等待所有动画执行完成后移除 active 类
    setTimeout(() => {
      button.classList.remove('active')
    }, 2500) // 2s(动画延迟) + 0.5s(动画持续时间)
  }
})
