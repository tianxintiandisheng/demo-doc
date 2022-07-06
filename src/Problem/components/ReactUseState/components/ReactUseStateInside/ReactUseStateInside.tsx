import React from 'react';
import styles from './ReactUseStateInside.less';

export interface ReactUseStateInsideProps extends React.HTMLAttributes<HTMLDivElement> {}

const ReactUseStateInside = (props: ReactUseStateInsideProps) => {
  const { className = '', ...otherProps } = props;
  return <div className={`${styles.root} ${className}`} {...otherProps}></div>;
};

export default ReactUseStateInside;
