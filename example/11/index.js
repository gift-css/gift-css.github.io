const openModalButton = document.querySelector('.open-modal')
const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.close-button')

// 打开模态窗口
openModalButton.addEventListener('click', () => {
  modal.classList.add('active')
})

// 关闭模态窗口
closeButton.addEventListener('click', () => {
  modal.classList.remove('active')
})

// 点击外部区域关闭模态窗口
modal.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.remove('active')
  }
})
