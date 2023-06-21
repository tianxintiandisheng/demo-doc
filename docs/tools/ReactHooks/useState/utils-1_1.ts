// let indexNum = 0;
// let stateArr: any[] = [];

// export const tdsState = <T>(initValue?: T): [T, (value: T) => void] => {

//   let stateValue;
//   if (stateArr[indexNum]) {
//     // 数组中存在数据,说明不是初始化
//     stateValue = stateArr[indexNum];
//   } else {
//     // 数组中不存在数据,说明为第一次加载(或者初始值为undefined)
//     stateValue = initValue;
//   }
//   const curIndexNum = indexNum;
//   indexNum = indexNum + 1; // 索引+1
//   const setStateValue = (value: T) => {
//     stateArr[curIndexNum] = value;
//     console.log('value', value);
//     console.log('stateArr', stateArr);
//     console.log('indexNum', indexNum);
//   };

//   return [stateValue, setStateValue];
// };

// export type Hook = {
//   memoizedState: any,
//   baseState: any,
//   baseUpdate: Update<any, any> | null,
//   queue: UpdateQueue<any, any> | null,
//   next: Hook | null,  // 指向下一个Hook
// };

// function mountWorkInProgressHook(): Hook {
//   const hook: Hook = {
//     memoizedState: null,
//     baseState: null,
//     queue: null,
//     baseUpdate: null,
//     next: null,
//   };
//   if (workInProgressHook === null) {
//     // 当前workInProgressHook链表为空的话，
//     // 将当前Hook作为第一个Hook
//     firstWorkInProgressHook = workInProgressHook = hook;
//   } else {
//     // 否则将当前Hook添加到Hook链表的末尾
//     workInProgressHook = workInProgressHook.next = hook;
//   }
//   return workInProgressHook;
// }

// // react-reconciler/src/ReactFiberHooks.js
// function mountState (initialState) {
//   // 获取当前的Hook节点，同时将当前Hook添加到Hook链表中
//   const hook = mountWorkInProgressHook();
//   if (typeof initialState === 'function') {
//     initialState = initialState();
//   }
//   hook.memoizedState = hook.baseState = initialState;
//   // 声明一个链表来存放更新
//   const queue = (hook.queue = {
//     last: null,
//     dispatch: null,
//     lastRenderedReducer,
//     lastRenderedState,
//   });
//   // 返回一个dispatch方法用来修改状态，并将此次更新添加update链表中
//   const dispatch = (queue.dispatch = (dispatchAction.bind(
//     null,
//     currentlyRenderingFiber,
//     queue,
//   )));
//   // 返回当前状态和修改状态的方法
//   return [hook.memoizedState, dispatch];
// }

// function dispatchAction(fiber,queue,action,) {
//   const update = {
//     action,
//     next: null,
//   };
//   // 将update对象添加到循环链表中
//   const last = queue.last;
//   if (last === null) {
//     // 链表为空，将当前更新作为第一个，并保持循环
//     update.next = update;
//   } else {
//     const first = last.next;
//     if (first !== null) {
//       // 在最新的update对象后面插入新的update对象
//       update.next = first;
//     }
//     last.next = update;
//   }
//   // 将表头保持在最新的update对象上
//   queue.last = update;
//  // 进行调度工作
//   scheduleWork();
// }
