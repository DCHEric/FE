# My React Project

一个使用 Create React App 创建的基础 React 项目，用于学习和实践 React 开发。

## 项目简介

这是一个标准的 React 单页应用（SPA）项目，使用了 Create React App 脚手架工具快速搭建。项目包含了 React 开发所需的基础配置和工具链，开箱即用。

## 技术栈

- **React 19.2.4** - 用于构建用户界面的 JavaScript 库
- **React DOM 19.2.4** - React 的 DOM 渲染器
- **React Scripts 5.0.1** - Create React App 的配置和脚本工具
- **Web Vitals** - 用于测量网页性能的工具
- **Testing Library** - React 组件测试工具集

## 项目结构

```
my-react-project/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   ├── index.html         # HTML 模板文件（应用的入口 HTML）
│   ├── logo192.png        # PWA 图标（192x192）
│   ├── logo512.png        # PWA 图标（512x512）
│   ├── manifest.json      # PWA 配置文件
│   └── robots.txt         # 搜索引擎爬虫规则
├── src/                   # 源代码目录
│   ├── App.css           # App 组件的样式文件
│   ├── App.js            # 主应用组件
│   ├── App.test.js       # App 组件的测试文件
│   ├── index.css         # 全局样式文件
│   ├── index.js          # 应用入口文件（JavaScript 入口）
│   ├── logo.svg          # React Logo
│   ├── reportWebVitals.js # 性能监测工具
│   └── setupTests.js     # 测试环境配置
├── node_modules/          # 项目依赖包（由 npm 自动管理）
├── .gitignore            # Git 忽略文件配置
├── package.json          # 项目配置和依赖声明
├── package-lock.json     # 依赖包版本锁定文件
└── README.md             # 项目说明文档（本文件）
```

## 核心文件说明

### public 目录

- **index.html**: 应用的 HTML 模板，包含一个 `<div id="root"></div>` 作为 React 应用的挂载点
- **manifest.json**: 用于配置 PWA（渐进式 Web 应用）功能
- **图标文件**: 用于浏览器标签页和 PWA 应用图标

### src 目录

- **index.js**: 应用的 JavaScript 入口文件
  - 使用 `ReactDOM.createRoot()` 创建 React 根节点
  - 将 `<App />` 组件渲染到 DOM 中的 `root` 元素
  - 使用 `<React.StrictMode>` 开启严格模式，帮助发现潜在问题

- **App.js**: 主应用组件
  - 项目的根组件，包含应用的主要界面
  - 目前展示了 React Logo 和一些欢迎信息

- **index.css**: 全局样式文件，定义整个应用的基础样式

- **App.css**: App 组件专属的样式文件

- **reportWebVitals.js**: 性能监测工具，用于测量和报告应用性能指标

- **setupTests.js**: Jest 测试环境的配置文件

## 可用脚本命令

在项目目录中，你可以运行以下命令：

### `npm start`

启动开发服务器，在开发模式下运行应用。

- 自动打开浏览器访问 [http://localhost:3000](http://localhost:3000)
- 修改代码后页面会自动热重载
- 在控制台中可以看到 lint 错误提示

### `npm test`

启动测试运行器，以交互式监视模式运行测试。

- 使用 Jest 作为测试框架
- 使用 React Testing Library 进行组件测试

### `npm run build`

构建生产版本的应用到 `build` 文件夹。

- 将 React 代码打包并优化为生产模式
- 代码会被压缩，文件名包含哈希值
- 应用已准备好部署

### `npm run eject`

**注意：这是一个单向操作，一旦执行就无法撤销！**

将所有配置文件和依赖项暴露出来，让你可以完全控制项目配置（Webpack、Babel、ESLint 等）。

对于大多数项目，你不需要使用 `eject`。

## React 基础概念

### 组件（Components）

React 应用由组件构成。组件是可复用的 UI 单元，可以是函数组件或类组件。本项目使用函数组件：

```javascript
function App() {
  return (
    <div className="App">
      {/* 组件内容 */}
    </div>
  );
}
```

### JSX

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码：

```javascript
<div className="App">
  <p>Hello, React!</p>
</div>
```

### 虚拟 DOM

React 使用虚拟 DOM 来优化性能。当状态改变时，React 会：
1. 在虚拟 DOM 中进行更新
2. 对比新旧虚拟 DOM 的差异
3. 只更新实际 DOM 中变化的部分

### 单向数据流

React 采用单向数据流：
- 数据从父组件流向子组件（通过 props）
- 子组件通过回调函数与父组件通信

## 开始开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm start
   ```

3. 编辑 [src/App.js](src/App.js) 开始你的第一个修改

4. 保存文件后，浏览器会自动刷新显示你的更改

## 学习资源

- [React 官方文档（中文）](https://zh-hans.react.dev/)
- [Create React App 文档](https://create-react-app.dev/)
- [React 教程](https://zh-hans.react.dev/learn)
- [React API 参考](https://zh-hans.react.dev/reference/react)

## 下一步

你可以尝试：

1. 修改 [src/App.js](src/App.js) 中的内容，体验热重载
2. 创建新的组件文件，并在 App.js 中引入
3. 学习使用 React Hooks（如 useState、useEffect）
4. 添加路由功能（react-router）
5. 集成状态管理库（Redux、Zustand 等）
6. 学习编写组件测试

## 部署

构建生产版本后，可以将 `build` 文件夹部署到各种静态托管服务：

- GitHub Pages
- Vercel
- Netlify
- AWS S3
- 其他静态网站托管服务

详细部署说明请参考：[Create React App 部署文档](https://create-react-app.dev/docs/deployment/)
