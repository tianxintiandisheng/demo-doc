import React from 'react';
import styles from './index.less';
import data from './index.html';

export interface EchartsMapProps extends React.HTMLAttributes<HTMLDivElement> {}

const EchartsMap = (props: EchartsMapProps) => {
  const { className = '', ...otherProps } = props;
  console.log('data', data);
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
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

export default EchartsMap;
