import React, { useState } from 'react';
import { InputNumber } from 'antd';
import styles from './FloatNumSum.less';

export interface FloatNumSumProps extends React.HTMLAttributes<HTMLDivElement> {}

const FloatNumSum = (props: FloatNumSumProps) => {
  const { className = '', ...otherProps } = props;
  const [floatNumList, setFloatNumList] = useState([1.1, 1.2, 1.3]);

  const sumFloatNum = (x: number, y: number) => {
    const stringX = `${x}`;
    const stringY = `${y}`;
    const integerX = stringX.includes('.') ? stringX.split('.')[0] : x;
    const decimalX = stringX.includes('.') ? stringX.split('.')[1] : 0;
    const integerY = stringY.includes('.') ? stringY.split('.')[0] : y;
    const decimalY = stringY.includes('.') ? stringY.split('.')[1] : 0;
    return Number(`${Number(integerX) + Number(integerY)}.${Number(decimalX) + Number(decimalY)}`);
  };

  const sum = () => {
    return floatNumList.reduce((x, y) => {
      return sumFloatNum(x, y);
    });
  };
  const sumJs = () => {
    return floatNumList.reduce((x, y) => x + y);
  };
  function onChange(value: number, index: number) {
    const newFloatNumList = [...floatNumList];
    newFloatNumList[index] = value;
    setFloatNumList(newFloatNumList);
  }

  return (
    <div className={`${styles.root} ${className}`} {...otherProps}>
      <InputNumber min={0} value={floatNumList[0]} onChange={(e) => onChange(e, 0)} />
      <InputNumber min={0} value={floatNumList[1]} onChange={(e) => onChange(e, 1)} />
      <InputNumber min={0} value={floatNumList[2]} onChange={(e) => onChange(e, 2)} />
      <h3></h3>
      <h3>javascriot的计算结果:</h3>
      <div>{`${floatNumList[0]}+${floatNumList[1]}+${floatNumList[2]}=${sumJs()}`}</div>
      <h3>优化后的计算结果:</h3>
      <div>{`${floatNumList[0]}+${floatNumList[1]}+${floatNumList[2]}=${sum()}`}</div>
    </div>
  );
};

export default FloatNumSum;
