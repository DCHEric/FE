# Node.js 基础知识学习

欢迎学习 Node.js！这个文件夹包含了 Node.js 的基础知识示例。

## 什么是 Node.js？

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。它让 JavaScript 可以在服务器端运行，而不仅仅是在浏览器中。

### Node.js 的特点

1. **异步非阻塞 I/O** - 高效处理并发请求
2. **事件驱动** - 基于事件循环机制
3. **单线程** - 简化编程模型
4. **跨平台** - 可在 Windows、macOS、Linux 上运行
5. **NPM 生态** - 拥有世界上最大的开源库生态系统

## 学习路径

按照以下顺序学习这些文件：

1. **01-hello-world.js** - 第一个 Node.js 程序
2. **02-modules.js** - Node.js 模块系统（CommonJS 和 ES Modules）
3. **03-fs-file-operations.js** - 文件系统操作
4. **04-path-module.js** - 路径处理模块
5. **05-http-server.js** - 创建 HTTP 服务器
6. **06-async-programming.js** - 异步编程（回调、Promise、async/await）
7. **07-event-emitter.js** - 事件系统
8. **08-stream.js** - 流处理

## 运行示例

```bash
# 运行单个文件
node 01-hello-world.js

# 查看 Node.js 版本
node --version

# 查看 NPM 版本
npm --version
```

## 常用命令

```bash
# 初始化项目
npm init

# 安装依赖包
npm install <package-name>

# 全局安装
npm install -g <package-name>

# 运行脚本
npm run <script-name>
```

## 推荐资源

- [Node.js 官方文档](https://nodejs.org/docs/)
- [NPM 官网](https://www.npmjs.com/)
- [Node.js 中文网](http://nodejs.cn/)

## 提示

每个文件都包含详细的注释和示例代码，建议按顺序学习。你可以修改代码并运行来加深理解。
