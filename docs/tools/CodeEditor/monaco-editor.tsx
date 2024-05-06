import Editor from '@monaco-editor/react';
import { INIT_SCHEMA } from './const';
import React from 'react';

const JsonEditor = () => {
  function handleEditorChange(value, event) {
    console.log('here is the current model value:', value);
  }

  return (
    <Editor
      height="60vh"
      defaultLanguage="json"
      defaultValue={JSON.stringify(INIT_SCHEMA, null, 2)}
      onChange={handleEditorChange}
      options={{
        automaticLayout: true, // 此属性设定后，编辑器会自动调整其布局以适应容器的大小变化。
        minimap: { enabled: false }, // 用于控制编辑器旁边是否显示一个小型的地图（Minimap），它提供了整个文档的概览，帮助用户快速定位代码位置。
        scrollBeyondLastLine: false, // 编辑器默认允许用户滚动到文档的最后一行之后，这个空白区域没有实际内容，只是一个视觉效果。当你将此选项设置为false时，用户滚动到底部时会被限制在文档的最后一行，无法继续滚动到没有内容的区域，这有时可以改善用户体验，特别是在文档较短时
      }}
    />
  );
};

export default JsonEditor;
