import React from 'react';
import styles from './BasicDesignable.less';

export interface BasicDesignableProps extends React.HTMLAttributes<HTMLDivElement> {}

const BasicDesignable = (props: BasicDesignableProps) => {
  const { className = '', ...otherProps } = props;
  return <div className={`${styles.root} ${className}`} {...otherProps}></div>;
};

export default BasicDesignable;
