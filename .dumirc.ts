import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'demo-doc',
    footer: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">浙ICP备2022009054号-1</a><br />Powered by <a href="https://d.umijs.org/" target="_blank" rel="noreferrer">dumi</a>',
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
