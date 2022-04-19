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
});
