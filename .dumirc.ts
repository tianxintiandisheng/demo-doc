import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'demo文档',
  favicons: ['/assets/tian-logo.png'],

  themeConfig: {
    logo: '/assets/tian-logo.png',
    name: 'demo-doc',
    nav: {
      mode: 'append',
      value: [
        {
          title: '变更日志',
          link: 'https://github.com/tianxintiandisheng/demo-doc/blob/main/CHANGELOG.md',
        },
        {
          title: 'GitHub',
          link: 'https://github.com/tianxintiandisheng/demo-doc',
        },
      ],
    },
    footer:
      '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">浙ICP备2022009054号-1</a><br />Powered by <a href="https://d.umijs.org/" target="_blank" rel="noreferrer">dumi</a>',
  },
  chainWebpack(config) {
    // 解析html文件
    config.module
      .rule('html-loader')
      .test(/\.html$/)
      .exclude.end()
      .use('html-loader')
      .loader('html-loader');
  },
});
