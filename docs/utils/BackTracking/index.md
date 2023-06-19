---
title: 回溯法
---

## 回溯法

回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。

> 白话：回溯法可以理解为通过选择不同的岔路口寻找目的地，一个岔路口一个岔路口的去尝试找到目的地。如果走错了路，继续返回来找到岔路口的另一条路，直到找到目的地。

## 代码实战

### 组合总和

找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：

- 所有数字都是正整数。

- 解集不能包含重复的组合。

示例 1:

> 输入: k = 3, n = 7 输出: [[1,2,4]]

示例 2:

> 输入: k = 3, n = 9 输出: [[1,2,6], [1,3,5], [2,3,4]]

<code src="./index.jsx"></code>

---

## 参考资料

[373，数据结构-6,树](https://mp.weixin.qq.com/s?__biz=MzU0ODMyNDk0Mw==&mid=2247487028&idx=1&sn=e06a0cd5760e62890e60e43a279a472b&chksm=fb419d14cc36140257eb220aaeac182287b10c3cab5c803ebd54013ee3fc120d693067c2e960&scene=21#wechat_redirect)

[Hhooks 的实践深入-hooks 模拟 componentDidUpdate](https://react.caoweiju.com/src/hooks/advance.html)

[React-hooks 的 useEffect 模拟 componentDidUpdate 生命周期](https://blog.csdn.net/fesfsefgs/article/details/108024853)
