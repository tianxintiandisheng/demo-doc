import React from 'react';
import styles from './CollectionCreateForm.less';

export interface CollectionCreateFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const CollectionCreateForm = (props: CollectionCreateFormProps) => {
  const { className = '', ...otherProps } = props;
  return <div className={`${styles.root} ${className}`} {...otherProps}></div>;
};

export default CollectionCreateForm;
