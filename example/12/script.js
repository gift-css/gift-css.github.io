const toggleBtn = document.getElementById('toggleBtn')
const card = document.getElementById('card')

toggleBtn.addEventListener('click', function () {
  card.classList.toggle('expanded') // 切换卡片的扩展状态
  if (card.classList.contains('expanded')) {
    toggleBtn.textContent = '收起' // 更新按钮文本
  } else {
    toggleBtn.textContent = '显示更多' // 更新按钮文本
  }
})
