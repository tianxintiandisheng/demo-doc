import React from 'react';
import data from './index.html';


const Demo = () => {
  return (
    <div className='root'>
      <iframe
        title="demo"
        srcDoc={data}
        style={{ width: '100%', border: '0px', height: '350px' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />
    </div>
  );
};

export default Demo;
