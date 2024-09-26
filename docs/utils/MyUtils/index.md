# 变量名称转换大写

## 编码实战

将将驼峰式字符串转换为大写

应用场景：提取变量为常量

```js
function camelToUpperCaseSnake(camelStr) {
  // 使用正则表达式找到所有大写字母的位置，并在这些位置前插入下划线
  // 然后将整个字符串转换为大写
  let upperSnakeStr = camelStr.replace(/([A-Z])/g, '_$1').toUpperCase();
  // 去除第一个字符如果是下划线的话
  if (upperSnakeStr.charAt(0) === '_') {
    upperSnakeStr = upperSnakeStr.slice(1);
  }
  return upperSnakeStr;
}

// 示例
let chapterListUrl = 'chapterListUrl';
let result = camelToUpperCaseSnake(chapterListUrl);
console.log(result); // 输出: CHAPTER_LIST_URL
```
