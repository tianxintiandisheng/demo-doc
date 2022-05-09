import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'demo文档',
  favicon: '/assets/tian-logo.png',
  logo: '/assets/tian-logo.png',
  outputPath: 'dist',
  mode: 'site',
  hash: 'true',
  // more config: https://d.umijs.org/config
  dynamicImport: {
    // loading: '@/Loading',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: '变更日志',
      path: 'https://github.com/tianxintiandisheng/demo-doc/blob/main/CHANGELOG.md',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/tianxintiandisheng/demo-doc',
    },
  ],
});
