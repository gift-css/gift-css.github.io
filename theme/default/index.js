    // 变量
    const body = document.querySelector('body')
    const mainContainer = body.querySelector('.main__container')
    // 加载example
    function reloadExample() {
        let ele = null
        for (let key in exampleConfig) {
            ele = document.createElement('object')
            ele.data = `../../example/${key}/index.html`
            ele.width = '100%'
            ele.height = '100%'
            // 标记
            mainContainer.appendChild(ele)
        }
    }
    // 设置大小
    function resetSize() {
        let objs = document.querySelectorAll('object')
        const bodyWidth = parseInt(window.getComputedStyle(body).width)
        const bodyHeight = parseInt(window.getComputedStyle(body).height)
        for ([index, item] of objs.entries()) {
            objs[index].style.marginLeft = (index % 3) * bodyWidth * (0.33 + 0.005) + 'px'
            objs[index].style.marginTop = parseInt(index / 3) * bodyHeight * (0.33 + 0.005) + 'px'
        }
    }
    // 初始化
    (function init() {
        reloadExample()
        window.addEventListener('resize', () => {
            resetSize()
        })
        resetSize()
    })()