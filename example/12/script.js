const body = document.body
const startButton = document.getElementById('startButton')
const stopButton = document.getElementById('stopButton')
let gradientInterval

function getRandomColor () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function startGradient () {
  gradientInterval = setInterval(() => {
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    body.style.background = `linear-gradient(45deg, ${color1}, ${color2})`
  }, 2000) // 每2秒更新一次渐变
}

function stopGradient () {
  clearInterval(gradientInterval)
}

// 绑定按钮事件
startButton.addEventListener('click', startGradient)
stopButton.addEventListener('click', stopGradient)
