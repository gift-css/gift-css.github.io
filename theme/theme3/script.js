/*
 * @Author: coffeemil ecalm5@gmail.com
 * @Date: 2025-01-22 12:49:19
 * @LastEditors: coffeemil ecalm5@gmail.com
 * @LastEditTime: 2025-03-21 17:04:44
 * @FilePath: \gift-css\theme\theme2\script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { exampleConfig } from '../../example/config.js'

// 变量
const body = document.querySelector('body')
const mainContainer = body.querySelector('.main__container')

// 设置object位置
function resetSize () {
  // 不需要动态计算 margin 了
}

let exampleList = document.querySelectorAll('.example__wrap')
const bodyWidth = parseInt(window.getComputedStyle(body).width)
const bodyHeight = parseInt(window.getComputedStyle(body).height)

// 每个示例的宽度和高度占比
const itemWidthRatio = 0.33
const itemHeightRatio = 0.33
const gapRatio = 0.005 // 示例之间的间隙占比

for (const [index, item] of exampleList.entries()) {
  // 计算列索引
  const colIndex = index % 3
  // 计算行索引
  const rowIndex = Math.floor(index / 3)

  // 设置元素的左边距
  item.style.marginLeft =
    colIndex * (itemWidthRatio + gapRatio) * bodyWidth + 'px'
  // 设置元素的上边距
  item.style.marginTop =
    rowIndex * (itemHeightRatio + gapRatio) * bodyHeight + 'px'
}

// 初始化
const searchInput = document.getElementById('search-input')
let currentExamples = []

// 防抖搜索函数
const debounceSearch = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// 优化后的示例加载
function loadExamples (filterText = '') {
  mainContainer.innerHTML = ''
  currentExamples = Object.entries(exampleConfig)
    .filter(([key, name]) =>
      name.toLowerCase().includes(filterText.toLowerCase())
    )
    .map(([key]) => createExampleCard(key))

  // 使用文档碎片批量添加
  const fragment = document.createDocumentFragment()
  currentExamples.forEach(example => fragment.appendChild(example.wrap))
  mainContainer.appendChild(fragment)
  resetSize() // 加载完示例后调整位置
}

// 创建带延迟加载的示例卡片
function createExampleCard (key) {
  const wrap = document.createElement('div')
  wrap.className = 'example__wrap'
  wrap.dataset.key = key
  return { wrap }
}

// 初始化函数
;(function init () {
  console.log('init function started')
  const observer = new IntersectionObserver(
    async entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const wrap = entry.target
          const key = wrap.dataset.key
          
          // 如果已经有shadowHost，则跳过
          if (wrap.shadowHost) {
            observer.unobserve(wrap)
            continue
          }
          
          // 创建shadowHost
          const shadowHost = document.createElement('div')
          shadowHost.style.width = '100%'
          shadowHost.style.height = '100%'
          wrap.appendChild(shadowHost)
          wrap.shadowHost = shadowHost
          
          // 创建 Shadow DOM
          const shadowRoot = shadowHost.attachShadow({ 
            mode: 'open',
            delegatesFocus: true // 添加焦点委托
          })
          shadowRoot.innerHTML = `
            <style>
              @import url('../../public/css/reset.css');
              @import url('../../example/${key}/index.css');
              :host {
                display: block;
                width: 100%;
                height: 100%;
              }
              /* 确保样式隔离 */
              :host(.content-wrapper) {
                all: initial;
              }
              .content-wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: scale(0.8);
                transform-origin: center center;
                overflow: hidden;
              }
            </style>
            <div class="loading">Loading...</div>
          `

          try {
            // 异步加载内容
            const response = await fetch(`../../example/${key}/index.html`)
            if (!response.ok) {
              throw new Error(`Failed to load ${key}: ${response.statusText}`)
            }
            const html = await response.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(html, 'text/html')
  
            // 创建内容包装器
            const contentWrapper = document.createElement('div')
            contentWrapper.className = 'content-wrapper'
            
            // 将内容添加到包装器中，但排除script标签
            Array.from(doc.body.children).forEach(node => {
              if (node.tagName.toLowerCase() !== 'script') {
                contentWrapper.appendChild(node.cloneNode(true))
              }
            })
  
            // 清除loading内容并添加实际内容
            shadowRoot.querySelector('.loading').remove()
            shadowRoot.appendChild(contentWrapper)
  
            // 加载并执行 JavaScript
            try {
              const jsResponse = await fetch(`../../example/${key}/index.js`)
              if (jsResponse.ok) {
                const jsContent = await jsResponse.text()
                const context = {
                  document: shadowRoot,  // 直接使用 shadowRoot 作为 document
                  querySelector: selector => shadowRoot.querySelector(selector),
                  querySelectorAll: selector => shadowRoot.querySelectorAll(selector),
                  window,
                  shadowRoot,
                  container: contentWrapper
                }
                const executeScript = new Function('context', `
                  with(context) {
                    try {
                      ${jsContent}
                    } catch (error) {
                      console.error('Error executing script:', error);
                    }
                  }
                `)
                executeScript(context)
              }
            } catch (jsError) {
              console.warn(`No JavaScript file found for example ${key}`, jsError)
            }
          } catch (error) {
            console.error(error)
            shadowRoot.innerHTML = '<div class="error">加载失败</div>'
          }

          observer.unobserve(wrap)
        }
      }
    },
    { threshold: 0.1 }
  )

  // 加载所有示例
  loadExamples()
  console.log('Examples loaded:', currentExamples)

  // 正确初始化观察目标
  currentExamples.forEach(({ wrap }) => observer.observe(wrap))
  console.log('Observers initialized')

  // 添加搜索功能
  if (searchInput) {
    const handleSearch = debounceSearch(e => {
      loadExamples(e.target.value)
      // 重新初始化观察目标
      currentExamples.forEach(({ wrap }) => observer.observe(wrap))
    }, 300)
    
    searchInput.addEventListener('input', handleSearch)
  }

  window.addEventListener('resize', resetSize)
})()
