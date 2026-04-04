/**
 * 01 - Hello World
 *
 * 这是你的第一个 Node.js 程序！
 * Node.js 可以直接运行 JavaScript 代码，无需浏览器。
 *
 * 运行方式: node 01-hello-world.js
 */

// 1. 基本输出
console.log('Hello, Node.js!');
console.log('你好，世界！');

// 2. Node.js 全局对象
console.log('\n--- Node.js 全局对象 ---');
console.log('当前文件路径:', __filename);
console.log('当前目录路径:', __dirname);
console.log('Node.js 版本:', process.version);
console.log('操作系统平台:', process.platform);

// 3. 全局变量 process
console.log('\n--- Process 对象 ---');
console.log('进程 ID:', process.pid);
console.log('当前工作目录:', process.cwd());

// 4. 环境变量
console.log('\n--- 环境变量 ---');
console.log('用户名:', process.env.USER || process.env.USERNAME);
console.log('HOME 目录:', process.env.HOME || process.env.USERPROFILE);

// 5. 命令行参数
console.log('\n--- 命令行参数 ---');
console.log('所有参数:', process.argv);
console.log('自定义参数:', process.argv.slice(2));

// 6. 定时器（和浏览器中类似）
console.log('\n--- 定时器 ---');
console.log('开始执行...');

setTimeout(() => {
    console.log('1秒后执行这条消息');
}, 1000);

console.log('这条消息会先显示（因为 setTimeout 是异步的）');

// 7. 简单的计算
console.log('\n--- 基本运算 ---');
const add = (a, b) => a + b;
const result = add(5, 3);
console.log(`5 + 3 = ${result}`);

// 8. 退出程序
// process.exit(0); // 0 表示成功，非0表示错误
// 注意：取消注释会立即退出程序

console.log('\n程序执行完毕！');
console.log('提示：尝试运行 "node 01-hello-world.js arg1 arg2" 查看命令行参数\n');
