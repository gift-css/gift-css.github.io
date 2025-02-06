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

// 根据示例是否有js文件，动态更新 code-type 选项（增加或移除 js 选项）
function updateCodeTypeOptions(jsExists) {
  const topContainer = document.querySelector('.main__container__content__top');
  let jsRadio = document.getElementById('js');
  if (jsExists) {
    // 如果不存在，则新增 js 选项
    if (!jsRadio) {
      jsRadio = document.createElement('input');
      jsRadio.type = 'radio';
      jsRadio.name = 'code-type';
      jsRadio.id = 'js';
      jsRadio.className = 'component-right-radio';
      jsRadio.hidden = true;
      jsRadio.addEventListener('change', updateCodeDisplay);

      // 创建对应的 label (可自行增加 svg 图标，这里以简单文本示例)
      const jsLabel = document.createElement('label');
      jsLabel.setAttribute('for', 'js');
      jsLabel.className = 'main__container__content__top__button';

      // 可选：增加简单的 js 图标
      const iconSpan = document.createElement('span');
      iconSpan.className = 'js-icon';
      iconSpan.textContent = 'JS';

      const textDiv = document.createElement('div');
      textDiv.className = 'main__container__content__top__button__text';
      textDiv.textContent = 'JS';

      jsLabel.appendChild(iconSpan);
      jsLabel.appendChild(textDiv);

      topContainer.appendChild(jsRadio);
      topContainer.appendChild(jsLabel);
    }
  } else {
    // 如果当前模块没有js，移除已存在的 js 选项（若有）
    if (jsRadio) {
      const jsLabel = jsRadio.nextElementSibling;
      jsRadio.remove();
      if (jsLabel) jsLabel.remove();
      // 如果当前选中的是 js，则切换回 html
      const currentSelected = document.querySelector(
        'input[name="code-type"]:checked'
      );
      if (currentSelected && currentSelected.id === 'js') {
        document.getElementById('html').checked = true;
        updateCodeDisplay();
      }
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

    // 利用 DOMParser 解析 HTML 内容，并修改相对路径（这里主要针对图片）
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // 调整所有 img 标签的 src 属性，确保相对路径的图片能加载（例如 "./img/xxx.jpg" 转为 "../../example/{key}/img/xxx.jpg"）
    const imgs = doc.querySelectorAll('img');
    imgs.forEach((img) => {
      let src = img.getAttribute('src');
      if (
        src &&
        !src.startsWith('http') &&
        !src.startsWith('//') &&
        !src.startsWith('data:')
      ) {
        src = src.replace(/^\.\//, '');
        img.setAttribute('src', `../../example/${key}/${src}`);
      }
    });

    // 如果需要，也可以对其他资源链接进行类似处理

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
    previewWrapper.innerHTML = previewContent;

    // 如果有 CSS，则创建 <style> 标签追加到预览容器中
    if (cssText) {
      const styleTag = document.createElement('style');
      styleTag.textContent = cssText;
      previewWrapper.appendChild(styleTag);
    }

    // 如果存在 JS 文件，则创建 <script> 标签，将 JS 代码追加到预览容器，这样就能引入并执行 js 文件
    if (jsExists) {
      const scriptTag = document.createElement('script');
      scriptTag.textContent = jsText;
      previewWrapper.appendChild(scriptTag);
    }

    modelContainer.appendChild(previewWrapper);

    // 更新代码展示区域
    updateCodeDisplay();

    // 根据当前模块是否存在 JS，更新 code-type 选项（增加或移除 js 选项）
    updateCodeTypeOptions(jsExists);
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
