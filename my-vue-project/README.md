# my-vue-project

一个使用 Vue CLI 创建的标准 Vue 2.x 项目，适合用于学习 Vue 2 的基础知识和开发单页面应用(SPA)。

## 项目结构

```
my-vue-project/
├── public/              # 静态资源目录
│   ├── favicon.ico     # 网站图标
│   └── index.html      # HTML模板（单页面应用入口）
├── src/                # 源代码目录
│   ├── assets/         # 静态资源（图片、样式等）
│   │   └── logo.png    # Vue logo
│   ├── components/     # Vue组件目录
│   │   └── HelloWorld.vue  # 示例组件
│   ├── App.vue         # 根组件
│   └── main.js         # 应用入口文件
├── dist/               # 构建输出目录（npm run build生成）
├── node_modules/       # 依赖包
├── package.json        # 项目配置和依赖
├── babel.config.js     # Babel配置
├── vue.config.js       # Vue CLI配置
├── jsconfig.json       # JS配置
└── .gitignore          # Git忽略文件
```

## 关键文件说明

### 1. src/main.js
应用入口文件，创建Vue实例并挂载到DOM：
```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### 2. src/App.vue
根组件，包含三个部分：
- `<template>` - HTML模板
- `<script>` - JavaScript逻辑
- `<style>` - CSS样式

### 3. public/index.html
单页面应用的HTML模板，包含 `<div id="app"></div>`，Vue实例会挂载到这里。

### 4. package.json
项目配置文件：
- **依赖**: Vue 2.6.14、core-js
- **开发依赖**: Vue CLI、Babel、ESLint
- **脚本命令**: serve、build、lint

## 工作流程

1. **入口**: public/index.html → `<div id="app">`
2. **启动**: src/main.js → 创建Vue实例
3. **根组件**: src/App.vue → 引入其他组件
4. **子组件**: src/components/HelloWorld.vue → 具体功能组件

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
