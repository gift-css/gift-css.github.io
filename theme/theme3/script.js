import { exampleConfig } from '../../example/config.js';

let currentHtmlContent = '';
let currentCssContent = '';
let currentJsContent = '';

// 根据当前选中的 code-type（html、css 或 js）更新代码展示区域的内容
function updateCodeDisplay() {
  const codeDisplay = document.getElementById('code-display');
  if (!codeDisplay) return;
  const codeType = document.querySelector('input[name="code-type"]:checked').id; // 'html' 或 'css' 或 'js'
  if (codeType === 'html') {
    codeDisplay.textContent = currentHtmlContent;
  } else if (codeType === 'css') {
    codeDisplay.textContent = currentCssContent;
  } else if (codeType === 'js') {
    codeDisplay.textContent = currentJsContent;
  }
}

// 设置 code-type 单选框的监听器（当值变化时更新代码显示）
function setupCodeTypeListener() {
  const radios = document.querySelectorAll('input[name="code-type"]');
  radios.forEach((radio) => {
    radio.addEventListener('change', updateCodeDisplay);
  });
}

// 根据示例是否有css、js文件，动态更新 code-type 选项（增加或移除 js 选项）
function updateCodeTypeOptions(jsExists, cssExists) {
  const topContainer = document.querySelector('.main__container__content__top');

  // 处理 CSS 选项
  let cssRadio = document.getElementById('css');
  if (cssExists) {
    if (!cssRadio) {
      cssRadio = document.createElement('input');
      cssRadio.type = 'radio';
      cssRadio.name = 'code-type';
      cssRadio.id = 'css';
      cssRadio.className = 'component-right-radio';
      cssRadio.hidden = true;
      cssRadio.addEventListener('change', updateCodeDisplay);

      const cssLabel = document.createElement('label');
      cssLabel.setAttribute('for', 'css');
      cssLabel.className =
        'main__container__content__top__button css-icon-label';
      cssLabel.style.order = 2;

      const cssIcon = document.createElement('div');
      cssIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" class="css-icon">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path fill="currentColor" d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3z"></path>
        </svg>
      `;

      const cssText = document.createElement('div');
      cssText.className = 'main__container__content__top__button__text';
      cssText.textContent = 'CSS';

      cssLabel.appendChild(cssIcon);
      cssLabel.appendChild(cssText);

      topContainer.appendChild(cssRadio);
      topContainer.appendChild(cssLabel);
    }
  } else if (cssRadio) {
    const cssLabel = cssRadio.nextElementSibling;
    cssRadio.remove();
    if (cssLabel) cssLabel.remove();
    if (
      document.querySelector('input[name="code-type"]:checked').id === 'css'
    ) {
      document.getElementById('html').checked = true;
      updateCodeDisplay();
    }
  }

  // 处理 JS 选项
  let jsRadio = document.getElementById('js');
  if (jsExists) {
    if (!jsRadio) {
      jsRadio = document.createElement('input');
      jsRadio.type = 'radio';
      jsRadio.name = 'code-type';
      jsRadio.id = 'js';
      jsRadio.className = 'component-right-radio';
      jsRadio.hidden = true;
      jsRadio.addEventListener('change', updateCodeDisplay);

      const jsLabel = document.createElement('label');
      jsLabel.setAttribute('for', 'js');
      jsLabel.className = 'main__container__content__top__button js-icon-label';
      jsLabel.style.order = 3;
      const jsIcon = document.createElement('div');
      jsIcon.innerHTML = `
        <svg class="js-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M238.592 155.648H399.36v450.56C399.36 809.984 302.08 880.64 146.432 880.64c-37.888 0-87.04-6.144-118.784-17.408l18.432-130.048c22.528 7.168 51.2 12.288 82.944 12.288 67.584 0 110.592-30.72 110.592-141.312V155.648h-1.024z m301.056 547.84c41.984 22.528 110.592 44.032 179.2 44.032 73.728 0 113.664-30.72 113.664-78.848 0-43.008-33.792-69.632-119.808-99.328-118.784-40.96-197.632-107.52-197.632-211.968C515.072 235.52 617.472 143.36 785.408 143.36c81.92 0 139.264 16.384 182.272 35.84L931.84 308.224c-27.648-13.312-79.872-33.792-148.48-33.792-69.632 0-103.424 32.768-103.424 68.608 0 45.056 38.912 65.536 132.096 101.376 125.952 46.08 184.32 112.64 184.32 214.016 0 119.808-91.136 221.184-286.72 221.184-81.92 0-161.792-22.528-201.728-44.032l31.744-132.096z" fill="#F4DE51" p-id="4219"></path></svg>
      `;

      const jsText = document.createElement('div');
      jsText.className = 'main__container__content__top__button__text';
      jsText.textContent = 'JavaScript';

      jsLabel.appendChild(jsIcon);
      jsLabel.appendChild(jsText);

      topContainer.appendChild(jsRadio);
      topContainer.appendChild(jsLabel);
    }
  } else if (jsRadio) {
    const jsLabel = jsRadio.nextElementSibling;
    jsRadio.remove();
    if (jsLabel) jsLabel.remove();
    if (document.querySelector('input[name="code-type"]:checked').id === 'js') {
      document.getElementById('html').checked = true;
      updateCodeDisplay();
    }
  }
}

// 加载模块的 HTML、CSS 和 JS（如果存在），并渲染预览区域和代码展示区域
async function loadModule(key) {
  // 点击后强制把 code-type 设置为 html
  document.getElementById('html').checked = true;

  // 构造各文件路径（相对于 theme/theme3 目录）
  const htmlPath = `../../example/${key}/index.html`;
  // 先尝试 index.css，不存在则尝试 style.css
  let cssPath = `../../example/${key}/index.css`;
  const jsPath = `../../example/${key}/index.js`;

  try {
    // 获取 HTML 内容
    const htmlResponse = await fetch(htmlPath);
    let htmlText = await htmlResponse.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // 这里可直接使用 <body> 里的内容作为预览区域展示内容
    const previewContent = doc.body.innerHTML;
    // 为了代码展示区域，保留原始的 HTML（完整内容）
    currentHtmlContent = htmlText;

    // 获取 CSS 内容（先 index.css，不存在则尝试 style.css）
    let cssText = '';
    let cssResponse = await fetch(cssPath);
    if (!cssResponse.ok) {
      cssPath = `../../example/${key}/style.css`;
      cssResponse = await fetch(cssPath);
    }
    if (cssResponse.ok) {
      cssText = await cssResponse.text();
    }
    currentCssContent = cssText;

    // 获取 JS 内容（如果存在）
    let jsText = '';
    let jsResponse = await fetch(jsPath);
    let jsExists = false;
    if (jsResponse.ok) {
      jsText = await jsResponse.text();
      jsExists = true;
    }
    currentJsContent = jsText;

    // 渲染预览区域（.main__container__model）
    const modelContainer = document.querySelector('.main__container__model');
    // 先清除上次内容
    modelContainer.innerHTML = '';
    // 利用 Flexbox 实现居中显示
    modelContainer.style.display = 'flex';
    modelContainer.style.justifyContent = 'center';
    modelContainer.style.alignItems = 'center';

    // 创建预览容器，将 HTML 预览内容插入
    const previewWrapper = document.createElement('div');
    previewWrapper.style.width = '100%';
    previewWrapper.style.height = '100%';
    previewWrapper.style.display = 'flex';
    previewWrapper.style.justifyContent = 'center';
    previewWrapper.style.alignItems = 'center';
    previewWrapper.innerHTML = previewContent;

    // 如果有 CSS，则创建 <style> 标签追加到预览容器中
    if (cssText) {
      const styleTag = document.createElement('style');
      styleTag.textContent = cssText;
      previewWrapper.appendChild(styleTag);
    }

    // 如果存在 JS 文件，则创建 <script> 标签，将 JS 代码追加到预览容器，这样就能引入并执行 js 文件
    if (jsExists) {
      // 将 jsText 包裹在 IIFE 内
      const isolatedJs = `;(function(){\n${jsText}\n})();`;
      const scriptTag = document.createElement('script');
      scriptTag.textContent = isolatedJs;
      previewWrapper.appendChild(scriptTag);
    }
    modelContainer.appendChild(previewWrapper);

    // 更新代码展示区域
    updateCodeDisplay();

    // 根据当前模块是否存在 JS，更新 code-type 选项（增加或移除 js 选项）
    updateCodeTypeOptions(jsExists, cssText);
  } catch (error) {
    console.error('加载模块时出错:', error);
  }
}

// 动态生成左侧项目列表，内容根据 exampleConfig 的 key 和对应描述创建
function initLeftItems() {
  const leftContainer = document.querySelector('.main__container__left');
  // 清空现有内容
  leftContainer.innerHTML = '';
  const keys = Object.keys(exampleConfig)
    .slice()
    .sort((a, b) => Number(a) - Number(b));
  keys.forEach((key) => {
    // 为每个模块创建一个左侧项
    const itemDiv = document.createElement('div');
    itemDiv.className = 'main__container__left__item';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'component';
    radio.id = key;
    radio.className = 'component-radio';
    radio.hidden = true;

    const label = document.createElement('label');
    label.setAttribute('for', key);
    label.className = 'main__container__left__item__title';
    label.textContent = exampleConfig[key];
    // 点击 label 时，触发加载函数，并将 code-type 强制切换为 html
    label.addEventListener('click', () => {
      console.log('点击label', key);
      loadModule(key);
    });

    itemDiv.appendChild(radio);
    itemDiv.appendChild(label);
    leftContainer.appendChild(itemDiv);
  });
}

// 初始化页面：生成左侧列表、设置 code-type 监听器、动态添加代码显示区域等
function main() {
  initLeftItems();
  setupCodeTypeListener();

  // // 在 .main__container__content 内添加代码显示区域（如果不存在）
  // const contentContainer = document.querySelector('.main__container__content');
  // let codeDisplay = document.getElementById('code-display');
  // if (!codeDisplay) {
  //   codeDisplay = document.createElement('div');
  //   codeDisplay.id = 'code-display';
  //   // 添加些基础样式
  //   codeDisplay.style.whiteSpace = 'pre-wrap';
  //   codeDisplay.style.fontFamily = 'monospace';
  //   codeDisplay.style.padding = '1em';
  //   contentContainer.appendChild(codeDisplay);
  // }

  // 默认加载列表中的第一个模块
  const keys = Object.keys(exampleConfig)
    .slice()
    .sort((a, b) => Number(a) - Number(b));
  if (keys.length > 0) {
    loadModule(keys[0]);
  }
}

document.addEventListener('DOMContentLoaded', main);
