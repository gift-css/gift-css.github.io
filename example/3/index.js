/*
 * @Author: coffeemil ecalm5@gmail.com
 * @Date: 2025-02-27 10:45:37
 * @LastEditors: coffeemil ecalm5@gmail.com
 * @LastEditTime: 2025-03-10 09:55:40
 * @FilePath: \gift-css\example\11\index.js
 */
const button = document.querySelector('.button')
button.addEventListener('click', () => {
  if (Array.from(button.classList).includes('active')) {
    button.classList.remove('active')
    button.classList.add('inactive')
  } else {
    button.classList.remove('inactive')
    button.classList.add('active')
  }
})

       
