/**
 * 06 - 异步编程
 *
 * Node.js 是单线程的，通过异步编程实现高并发。
 * 异步编程有三种主要方式：回调函数、Promise、async/await
 *
 * 运行方式: node 06-async-programming.js
 */

console.log('=== Node.js 异步编程 ===\n');

// ============================================
// 1. 同步 vs 异步
// ============================================
console.log('--- 1. 同步 vs 异步 ---');

console.log('1. 开始');

// 同步操作 - 会阻塞后续代码
console.log('2. 这是同步代码');

// 异步操作 - 不会阻塞后续代码
setTimeout(() => {
    console.log('4. 这是异步代码（1秒后执行）');
}, 1000);

console.log('3. 继续执行');

// ============================================
// 2. 回调函数 (Callback)
// ============================================
console.log('\n--- 2. 回调函数 ---');

// 模拟异步操作
function fetchUserData(userId, callback) {
    console.log(`正在获取用户 ${userId} 的数据...`);

    setTimeout(() => {
        const userData = {
            id: userId,
            name: '张三',
            email: 'zhangsan@example.com'
        };
        callback(null, userData); // 第一个参数是 error，第二个是数据
    }, 500);
}

fetchUserData(1, (err, data) => {
    if (err) {
        console.error('获取用户数据失败:', err);
    } else {
        console.log('用户数据:', data);
    }
});

// 回调地狱示例
console.log('\n回调地狱问题:');
setTimeout(() => {
    console.log('第一步');
    setTimeout(() => {
        console.log('第二步');
        setTimeout(() => {
            console.log('第三步');
            console.log('代码嵌套太深，难以维护！');
        }, 100);
    }, 100);
}, 100);

// ============================================
// 3. Promise
// ============================================
console.log('\n--- 3. Promise ---');

// 创建 Promise
function fetchUserDataPromise(userId) {
    console.log(`\n正在获取用户 ${userId} 的数据 (Promise)...`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const userData = {
                    id: userId,
                    name: '李四',
                    email: 'lisi@example.com'
                };
                resolve(userData); // 成功
            } else {
                reject(new Error('无效的用户 ID')); // 失败
            }
        }, 500);
    });
}

// 使用 Promise
fetchUserDataPromise(2)
    .then(data => {
        console.log('Promise 成功:', data);
        return data.id;
    })
    .then(id => {
        console.log('用户 ID:', id);
    })
    .catch(err => {
        console.error('Promise 失败:', err.message);
    })
    .finally(() => {
        console.log('Promise 完成');
    });

// Promise 链式调用 - 解决回调地狱
function step1() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('\nPromise 链: 第一步');
            resolve('步骤1完成');
        }, 200);
    });
}

function step2(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Promise 链: 第二步', data);
            resolve('步骤2完成');
        }, 200);
    });
}

function step3(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Promise 链: 第三步', data);
            resolve('全部完成');
        }, 200);
    });
}

step1()
    .then(step2)
    .then(step3)
    .then(result => {
        console.log('Promise 链执行完毕:', result);
    });

// ============================================
// 4. async/await (最现代的方式)
// ============================================
console.log('\n--- 4. async/await ---');

// async 函数总是返回 Promise
async function getUserInfo(userId) {
    console.log(`\n正在获取用户 ${userId} 的信息 (async/await)...`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: '王五',
                email: 'wangwu@example.com'
            });
        }, 500);
    });
}

// 使用 async/await
async function displayUserInfo() {
    try {
        console.log('开始获取用户信息...');

        // await 会等待 Promise 完成
        const user = await getUserInfo(3);
        console.log('用户信息:', user);

        console.log('继续处理其他逻辑...');

    } catch (err) {
        console.error('错误:', err);
    }
}

displayUserInfo();

// async/await 处理多个异步操作
async function multipleAsyncOperations() {
    console.log('\n--- 多个异步操作 ---');

    // 串行执行（一个接一个）
    console.log('串行执行:');
    const start1 = Date.now();
    const result1 = await getUserInfo(4);
    const result2 = await getUserInfo(5);
    console.log('串行耗时:', Date.now() - start1, 'ms');

    // 并行执行（同时进行）
    console.log('\n并行执行:');
    const start2 = Date.now();
    const [result3, result4] = await Promise.all([
        getUserInfo(6),
        getUserInfo(7)
    ]);
    console.log('并行耗时:', Date.now() - start2, 'ms');
    console.log('并行结果:', result3, result4);
}

setTimeout(() => {
    multipleAsyncOperations();
}, 2000);

// ============================================
// 5. Promise 静态方法
// ============================================
console.log('\n--- 5. Promise 静态方法 ---');

// Promise.all - 全部成功才成功
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('\nPromise.all 结果:', results);
    });

// Promise.race - 第一个完成的结果
const slow = new Promise(resolve => setTimeout(() => resolve('慢'), 1000));
const fast = new Promise(resolve => setTimeout(() => resolve('快'), 100));

Promise.race([slow, fast])
    .then(result => {
        console.log('Promise.race 结果:', result);
    });

// Promise.allSettled - 等待所有 Promise 完成（不管成功失败）
const success = Promise.resolve('成功');
const failure = Promise.reject('失败');

Promise.allSettled([success, failure])
    .then(results => {
        console.log('Promise.allSettled 结果:', results);
    });

// Promise.any - 第一个成功的结果
Promise.any([failure, success])
    .then(result => {
        console.log('Promise.any 结果:', result);
    });

// ============================================
// 6. 实用示例：文件读取
// ============================================
console.log('\n--- 6. 实用示例 ---');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

// 方式1: 回调函数
function readFileCallback() {
    const filePath = path.join(__dirname, 'README.md');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('读取失败:', err);
        } else {
            console.log('\n回调方式读取文件成功，长度:', data.length);
        }
    });
}

// 方式2: Promise
function readFilePromise() {
    const filePath = path.join(__dirname, 'README.md');
    return fsPromises.readFile(filePath, 'utf8')
        .then(data => {
            console.log('Promise 方式读取文件成功，长度:', data.length);
        })
        .catch(err => {
            console.error('读取失败:', err);
        });
}

// 方式3: async/await
async function readFileAsync() {
    try {
        const filePath = path.join(__dirname, 'README.md');
        const data = await fsPromises.readFile(filePath, 'utf8');
        console.log('async/await 方式读取文件成功，长度:', data.length);
    } catch (err) {
        console.error('读取失败:', err);
    }
}

setTimeout(() => {
    readFileCallback();
    readFilePromise();
    readFileAsync();
}, 3000);

// ============================================
// 7. 错误处理
// ============================================
console.log('\n--- 7. 错误处理 ---');

// Promise 错误处理
Promise.reject('出错了')
    .catch(err => {
        console.log('\nPromise catch:', err);
    });

// async/await 错误处理
async function handleErrors() {
    try {
        throw new Error('async 函数中的错误');
    } catch (err) {
        console.log('try-catch 捕获:', err.message);
    }
}

handleErrors();

// ============================================
// 知识点总结
// ============================================
setTimeout(() => {
    console.log('\n--- 异步编程总结 ---');
    console.log(`
回调函数 (Callback):
  优点: 简单直接
  缺点: 容易形成回调地狱，难以维护

Promise:
  优点: 链式调用，避免回调地狱
  缺点: 仍然有一定嵌套

async/await:
  优点: 代码更清晰，像同步代码一样
  缺点: 需要理解 Promise

推荐使用: async/await (现代 Node.js 开发的标准方式)

Promise 静态方法:
  Promise.all()        - 全部成功才成功
  Promise.race()       - 第一个完成的结果
  Promise.allSettled() - 等待全部完成
  Promise.any()        - 第一个成功的结果
    `);
}, 4000);
