import { message } from 'antd';

// const mockRequest = () => {
//   const data = [];
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       for (let i = 0; i < 10; i++) {
//         data.push({
//           id: i.toString(),
//         });
//       }
//       resolve(data);
//     }, 1000);
//   });
// };

export interface ListItem {
  id: string;
  title: string;
  detailList: DetailItem[];
  logo: string;
}
export interface DetailItem {
  title: string;
  type: string;
  value: number;
}
export const getList = () => {
  const data = [
    {
      id: 1,
      title: 'js中函数(方法)注释',
      logo: 'https://joeschmoe.io/api/v1/random',
      detailList: [
        {
          title: '查看',
          type: 'look',
          value: 1,
        },
        {
          title: '点赞',
          type: 'like',
          value: 1,
        },
        {
          title: '评论',
          type: 'remark',
          value: 1,
        },
      ],
    },
    {
      id: 2,
      title: 'react组件-生命周期',
      logo: 'https://joeschmoe.io/api/v1/random',
      detailList: [
        {
          title: '查看',
          type: 'look',
          value: 2,
        },
        {
          title: '点赞',
          type: 'like',
          value: 2,
        },
        {
          title: '评论',
          type: 'remark',
          value: 2,
        },
      ],
    },
    {
      id: 3,
      title: 'react中的ref是什么',
      logo: 'https://joeschmoe.io/api/v1/random',
      detailList: [
        {
          title: '查看',
          type: 'look',
          value: 2,
        },
        {
          title: '点赞',
          type: 'like',
          value: 3,
        },
        {
          title: '评论',
          type: 'remark',
          value: 3,
        },
      ],
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const refreshItem = (detailList: DetailItem[]) => {
  let deepCopyData = JSON.parse(JSON.stringify(detailList));
  const data = deepCopyData.map((i: DetailItem) => {
    if (i.type === 'look') {
      console.log('此时查看的value', i.value + 1);
      message.success(`刷新成功,此时的value为${i.value + 1}`);
      return {
        ...i,
        value: i.value + 1,
      };
    }
    return i;
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
