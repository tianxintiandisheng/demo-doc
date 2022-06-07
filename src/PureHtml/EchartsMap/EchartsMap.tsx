import React from 'react';
import styles from './EchartsMap.less';
import data from './EchartsMap.html';

export interface EchartsMapProps extends React.HTMLAttributes<HTMLDivElement> {}

const EchartsMap = (props: EchartsMapProps) => {
  const { className = '', ...otherProps } = props;
  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      <iframe
        title="resg"
        srcDoc={data}
        style={{ width: '100%', border: '0px', height: '600px' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />
    </div>
  );
};

export default EchartsMap;
