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

## 提交代码

### Commitizen

Commitizen: 替代你的 git commit commitizen/cz-cli, 我们需要借助它提供的 git cz 命令替代我们的 git commit 命令, 帮助我们生成符合规范的 commit message.

除此之外, 我们还需要为 commitizen 指定一个 Adapter 比如: cz-conventional-changelog (一个符合 Angular 团队规范的 preset). 使得 commitizen 按照我们指定的规范帮助我们生成 commit message.

```bash
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### 命令

```bash
$ git cz
```

or

```bash
$ npm run commit
```

### cz 的类型枚举

git cz 给出了 commit 的几种类型选项，如下：

- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置，脚本文件等更新
- chore 非 src 或者 测试文件的更新
- revert commit 回退

## CHANGELOG

生成 CHANGELOG 文件

```bash
npm run changelog
```
