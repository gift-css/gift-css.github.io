const imgMap = [
  'https://file.sio2.live/i/2025/02/06/otr7s3.jpg',
  'https://file.sio2.live/i/2025/02/06/otr6n8.jpg',
  'https://file.sio2.live/i/2025/02/06/otr794.jpg',
];
// 轮播
function next(wrap) {
  const item1 = wrap.querySelector('li');
  wrap.removeChild(item1);
  const newBanner = createBanner(imgMap[Math.floor(3 * Math.random())]);
  wrap.appendChild(newBanner);
}
// 创建banner
function createBanner(src) {
  const li = document.createElement('li');
  li.className = 'banner__item';
  const img = document.createElement('img');
  img.src = src;
  li.appendChild(img);
  return li;
}
// 初始化
(function loop() {
  const wrap = document.querySelector('.banner__wrap');
  for (let i = 0; i < 17; i++) {
    wrap.appendChild(createBanner(imgMap[i % 3]));
  }
  setInterval(() => {
    next(wrap);
  }, 2000);
})();
