# demo-doc

## Getting Started

安装依赖

```bash
$ npm i
```

启动项目

```bash
$ npm start
```

打包文档站点项目

```bash
$ npm run docs:build
```

启动测试

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```

## 规范

### 提交代码

```bash
$ npm run cz
```

### CHANGELOG

conventional-changelog-cli 就是生成 CHANGELOG 的工具，我们首先来安装一下：

```bash
$ npm install -g conventional-changelog-cli
```

生成 CHANGELOG 文件

```bash
conventional-changelog -p angular -i CHANGELOG.md -s
```

or

```bash
npm run changelog
```
