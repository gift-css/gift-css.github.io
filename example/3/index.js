// 轮播
function next(wrap) {
  const item1 = wrap.querySelector('li');
  wrap.removeChild(item1);
  const newBanner = createBanner(
    `./img/${Math.floor(3 * Math.random() + 1)}.jpg`
  );
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
    wrap.appendChild(createBanner(`./img/${(i % 3) + 1}.jpg`));
  }
  setInterval(() => {
    next(wrap);
  }, 2000);
})();
