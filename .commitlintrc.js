module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['setter']],
  },
};

// rule配置说明:：rule由name和配置数组组成，如：'name:[0, 'always', 72]'，
// 数组中第一位为level，可选0,1,2，0为disable，1为warning，2为error，
// 第二位为应用与否，可选always|never，
// 第三位该rule的值
// 参考资料 [commitlint配置](https://juejin.cn/post/6983191125242675230)
// 参考资料 [commitlint官方文档-rule](https://commitlint.js.org/#/reference-rules)
