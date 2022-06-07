import React from 'react';
import styles from './ObservableDemo.less';

export interface ObservableDemoProps extends React.HTMLAttributes<HTMLDivElement> {}

const ObservableDemo = (props: ObservableDemoProps) => {
  const { className = '', ...otherProps } = props;
  return <div className={`${styles.root} ${className}`} {...otherProps}></div>;
};

export default ObservableDemo;
