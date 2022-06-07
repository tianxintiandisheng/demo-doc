const observable = (target: {}, tracker?: () => void) => {
  const handler = {
    get(target: any, propKey: any, receiver: any) {
      // console.log('target-get',target);
      // console.log('propKey-get',propKey);
      // console.log('receiver-get',receiver);
      return `${propKey}!!!`;
    },
    set(target: any, propKey: any, value: any, receiver: any): boolean {
      // console.log('target-set',target);
      // console.log('propKey-set',propKey);
      // console.log('value-set',value);
      // console.log('receiver-set',receiver);
      const autorun = (tracker: () => void) => {
        tracker();
      };
      if (tracker) {
        autorun(tracker);
      }
      return true;
    },
  };
  const proxy = new Proxy(target, handler);
  return proxy;
};

export { observable };
