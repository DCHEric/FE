/**
 * 02 - Node.js 模块系统
 *
 * Node.js 使用模块化来组织代码。主要有两种模块系统：
 * 1. CommonJS (CJS) - Node.js 原生支持，使用 require/module.exports
 * 2. ES Modules (ESM) - ES6 标准，使用 import/export
 *
 * 运行方式: node 02-modules.js
 */

console.log('=== Node.js 模块系统 ===\n');

// ============================================
// 1. 核心模块（内置模块）
// ============================================
console.log('--- 1. 核心模块 ---');

// 导入内置模块，无需安装
const os = require('os');
const path = require('path');
const fs = require('fs');

console.log('操作系统类型:', os.type());
console.log('系统总内存:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('CPU 核心数:', os.cpus().length);

// ============================================
// 2. 自定义模块 - 创建和使用
// ============================================
console.log('\n--- 2. 自定义模块 ---');

// 创建一个简单的工具模块
const myUtils = {
    // 计算两个数的和
    add: (a, b) => a + b,

    // 计算两个数的乘积
    multiply: (a, b) => a * b,

    // 获取当前时间
    getCurrentTime: () => new Date().toLocaleString('zh-CN'),

    // 问候函数
    greet: (name) => `你好，${name}！`
};

console.log('加法示例:', myUtils.add(10, 5));
console.log('乘法示例:', myUtils.multiply(10, 5));
console.log('当前时间:', myUtils.getCurrentTime());
console.log(myUtils.greet('Node.js 学习者'));

// ============================================
// 3. module.exports vs exports
// ============================================
console.log('\n--- 3. 导出方式 ---');

// 方式1: module.exports 导出整个对象
const moduleExportsExample = {
    name: 'Module Exports 示例',
    value: 42
};

// 方式2: exports 导出单个属性（实际上 exports 是 module.exports 的引用）
const exportsExample = {};
exportsExample.name = 'Exports 示例';
exportsExample.value = 100;

console.log('module.exports 示例:', moduleExportsExample);
console.log('exports 示例:', exportsExample);

// ============================================
// 4. 模块缓存
// ============================================
console.log('\n--- 4. 模块缓存 ---');
console.log('Node.js 会缓存已加载的模块，多次 require 同一模块只会执行一次');
console.log('缓存的模块:', Object.keys(require.cache).length, '个');

// ============================================
// 5. 常用核心模块介绍
// ============================================
console.log('\n--- 5. 常用核心模块 ---');

const coreModules = [
    { name: 'fs', desc: '文件系统 - 读写文件' },
    { name: 'path', desc: '路径处理 - 处理文件路径' },
    { name: 'http', desc: 'HTTP 服务器 - 创建 Web 服务器' },
    { name: 'https', desc: 'HTTPS 服务器 - 创建安全的 Web 服务器' },
    { name: 'os', desc: '操作系统 - 获取系统信息' },
    { name: 'events', desc: '事件 - 事件驱动编程' },
    { name: 'stream', desc: '流 - 处理流式数据' },
    { name: 'url', desc: 'URL - 解析和格式化 URL' },
    { name: 'querystring', desc: '查询字符串 - 解析 URL 查询参数' },
    { name: 'crypto', desc: '加密 - 加密解密功能' },
    { name: 'buffer', desc: '缓冲区 - 处理二进制数据' },
    { name: 'child_process', desc: '子进程 - 执行外部命令' },
];

coreModules.forEach(module => {
    console.log(`  ${module.name.padEnd(15)} - ${module.desc}`);
});

// ============================================
// 6. 路径处理示例
// ============================================
console.log('\n--- 6. 路径处理示例 ---');

const filePath = '/Users/dch/FE/nodejs-basics/02-modules.js';
console.log('完整路径:', filePath);
console.log('目录名:', path.dirname(filePath));
console.log('文件名:', path.basename(filePath));
console.log('扩展名:', path.extname(filePath));
console.log('路径对象:', path.parse(filePath));

// 拼接路径
const joinedPath = path.join(__dirname, 'data', 'test.txt');
console.log('拼接路径:', joinedPath);

// ============================================
// 7. 模块查找规则
// ============================================
console.log('\n--- 7. 模块查找规则 ---');
console.log('当使用 require() 加载模块时，Node.js 按以下顺序查找：');
console.log('1. 核心模块（如 fs, path, http）');
console.log('2. 以 ./ 或 ../ 开头的相对路径模块');
console.log('3. 以 / 开头的绝对路径模块');
console.log('4. node_modules 目录中的模块');

// ============================================
// 实践练习
// ============================================
console.log('\n--- 实践练习 ---');
console.log('1. 尝试创建一个新文件 my-module.js');
console.log('2. 在里面导出一些函数');
console.log('3. 在这个文件中使用 require() 导入');
console.log('\n示例代码:');
console.log(`
// my-module.js
module.exports = {
    sayHello: (name) => \`Hello, \${name}!\`,
    getCurrentYear: () => new Date().getFullYear()
};

// 在 02-modules.js 中使用
// const myModule = require('./my-module');
// console.log(myModule.sayHello('World'));
`);

console.log('\n模块学习完成！接下来学习文件操作。\n');
