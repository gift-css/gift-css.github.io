const button = document.querySelector('.button')

function debounce(func, wait, immediate = true) {
  let timeout
  let lastCallTime = 0
  const throttleDelay = wait / 2

  return function() {
    const context = this
    const args = arguments
    const now = Date.now()

    // 处理首次点击立即执行
    if (immediate && !timeout) {
      func.apply(context, args)
      lastCallTime = now
    }

    // 节流处理，防止频繁触发
    if (now - lastCallTime >= throttleDelay) {
      clearTimeout(timeout)
      func.apply(context, args)
      lastCallTime = now
    } else {
      // 防抖处理
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(context, args)
        lastCallTime = Date.now()
      }, wait)
    }
  }
}

button.addEventListener('click', debounce(() => {
  if (!button.classList.contains('active')) {
    button.classList.add('active')
    setTimeout(() => {
      button.classList.remove('active')
    }, 2000)
  }
}, 1000, true))
