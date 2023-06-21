let indexNum = 0;
let stateArr: any[] = [];

export const tdsState = <T>(initValue?: T): [T, (value: T) => void] => {
  let stateValue;
  if (stateArr[indexNum]) {
    // 数组中存在数据,说明不是初始化
    stateValue = stateArr[indexNum];
  } else {
    // 数组中不存在数据,说明为第一次加载(或者初始值为undefined)
    stateValue = initValue;
  }
  const curIndexNum = indexNum;
  indexNum = indexNum + 1; // 索引+1
  const setStateValue = (value: T) => {
    stateArr[curIndexNum] = value;
    console.log('value', value);
    console.log('stateArr', stateArr);
    console.log('indexNum', indexNum);
  };

  return [stateValue, setStateValue];
};
