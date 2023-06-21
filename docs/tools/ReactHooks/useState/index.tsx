import React, { useState, useEffect } from 'react';

import { tdsState } from './utils-1_1';

export default () => {
  const [count, setCount] = tdsState(0);

  console.log('count', count);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
