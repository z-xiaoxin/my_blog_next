# here is xiaoxin's first article

- 全屏

  ```javascript
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // ios safari
    element.webkitRequestFullscreen();
  }
  ```

- js URL 转译方法 encodeURIComponent()

  ```typescript
  function addQueryParam(url: string, key: string, value: string) {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    if (params.has(key)) {
      params.set(key, value);
    } else {
      params.append(key, value);
    }
    urlObj.search = params.toString();
    return urlObj.href;
  }
  ```

- ```js
  const toThousands = (num) =>
    String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ```

- ```javascript
  console.info(
    "%cThis is My stylish %cThis is My stylish",
    "color: yellow; background-color: #409eff;padding: 4px 12px;border-radius: 4px 0 0 4px;font-weight: 1000;",
    "color: black; background-color: #fff;padding: 4px 12px;border-radius: 0 4px 4px 0;"
  );
  // 了解一下console
  ```

- ```typescript
  // 创建blob对象
  const text = "This is a sample text file.";
  const blob = new Blob([text], { type: "text/plain" });
  // type 值 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types/Common_types
  ```

- ```javascript
  // IIFE （Immediately-Invoked Function Expression）立即执行函数
  ```

- 获取当前屏幕大概刷新率

  ```ts
  let last = performance.now();
  let count = 0;

  function measure() {
    const now = performance.now();
    count++;
    if (now - last >= 1000) {
      console.log(`当前刷新率 ≈ ${count}fps`);
      count = 0;
      last = now;
    }
    requestAnimationFrame(measure);
  }

  requestAnimationFrame(measure);
  ```
