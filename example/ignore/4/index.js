const countdown = document.querySelector('#countdown')
const go = document.querySelector('#go')
const replay = document.querySelector('#replay')
const num = document.querySelectorAll('.nums>div')[0]

function reset() {
  go.classList.remove('hide')
  go.classList.add('show')
  countdown.classList.remove('show')
  countdown.classList.add('hide')
}

function start() {
  go.classList.remove('show')
  go.classList.add('hide')
  countdown.classList.remove('hide')
  countdown.classList.add('show')
  num.classList.add('in')
  num.innerHTML = 3
}


// 单机按钮
replay.addEventListener('click', () => {
  start()
})

// 动画结束执行
num.addEventListener('animationend', (item) => {
  if (item.animationName === 'anime-in') {
    num.classList.remove('in')
    num.classList.add('out')
  }
  if (item.animationName === 'anime-out') {
    num.classList.remove('out')
    const value = Number(num.innerHTML)
    if (value > 0) {
      num.innerHTML = value - 1
      num.classList.add('in')
    } else {
      // 结束
      reset()
    }
  }
})