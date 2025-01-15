import { exampleConfig } from '../../example/config.js'
// 变量
const body = document.querySelector('body')
const mainContainer = body.querySelector('.main__container')
// 根据exampleConfig创建实例
function reloadExample() {
    let exampleWrap = null
    let exampleName = null
    let ele = null
    for (let key in exampleConfig) {
        // 创建节点
        exampleWrap = document.createElement('div')
        exampleName = document.createElement('h2')
        ele = document.createElement('object')
        // 设置ele属性
        ele.data = `../../example/${key}/index.html`
        ele.width = '100%'
        ele.height = '100%'
        // ele.className='example__object'
        // 设置exampleWrap相关
        exampleWrap.className = 'example__wrap'
        // 设置exampleName相关
        exampleName.innerText = exampleConfig[key]
        // exampleName.className='example__name'
        // 将节点添加至mainContainer
        exampleWrap.appendChild(ele)
        exampleWrap.appendChild(exampleName)
        mainContainer.appendChild(exampleWrap)
    }
}
// 设置object位置
function resetSize() {
    let exampleList = document.querySelectorAll('.example__wrap')
    const bodyWidth = parseInt(window.getComputedStyle(body).width)
    const bodyHeight = parseInt(window.getComputedStyle(body).height)
    for (const [index, item] of exampleList.entries()) {
        item.style.marginLeft = (index % 3) * bodyWidth * (0.33 + 0.005) + 'px'
        item.style.marginTop = parseInt(index / 3) * bodyHeight * (0.33 + 0.005) + 'px'
    }
}
// 初始化
(function init() {
    window.addEventListener('resize', () => {
        resetSize()
    })
    reloadExample()
    resetSize()
})()


