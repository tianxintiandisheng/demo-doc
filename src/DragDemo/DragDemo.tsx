import React from 'react';
import styles from './DragDemo.less';

export interface DragDemoProps extends React.HTMLAttributes<HTMLDivElement> {}

const DragDemo = (props: DragDemoProps) => {
  const { className = '', ...otherProps } = props;
  return <div className={`${styles.root} ${className}`} {...otherProps}></div>;
};

export default DragDemo;
