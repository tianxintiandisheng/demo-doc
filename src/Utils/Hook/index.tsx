import React, { useState, useEffect, useRef } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState(1);
  const mounting = useRef(true);

  const saveData = () => {
    console.log('useRef----', `保存数据${pageNum}`);
  };

  useEffect(() => {
    if (mounting.current) {
      console.log('初次渲染');
      mounting.current = false;
    } else {
      saveData();
    }
  }, [pageNum]);

  return (
    <div>
      <button onClick={() => setPageNum(pageNum + 1)}>翻页{pageNum}</button>
    </div>
  );
};
