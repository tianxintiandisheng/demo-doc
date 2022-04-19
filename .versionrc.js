module.exports = {
  //types为Conventional Commits标准中定义，目前支持
  //https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
  types: [
    { type: 'feat', section: '新特性' },
    { type: 'fix', section: 'Bug修复' },
    { type: 'docs', section: '文档' },
    { type: 'chore', section: '配置项' },
    { type: 'style', section: '格式' },
    { type: 'refactor', section: '重构' },
    { type: 'perf', section: '性能' },
    { type: 'test', section: '测试' },
    { type: 'build', section: '构建' },
    { type: 'ci', section: 'CI', hidden: true },
    { type: 'revert', section: '回滚', hidden: true },
  ],
};
