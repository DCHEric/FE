/**
 * 07 - 事件系统 (Event Emitter)
 *
 * Node.js 是事件驱动的架构。
 * EventEmitter 是 Node.js 中许多对象的基础。
 *
 * 运行方式: node 07-event-emitter.js
 */

const EventEmitter = require('events');

console.log('=== Node.js 事件系统 ===\n');

// ============================================
// 1. 创建事件发射器
// ============================================
console.log('--- 1. 创建事件发射器 ---');

const myEmitter = new EventEmitter();

// 监听事件
myEmitter.on('event', () => {
    console.log('事件被触发了！');
});

// 触发事件
myEmitter.emit('event');

// ============================================
// 2. 事件参数
// ============================================
console.log('\n--- 2. 事件参数 ---');

const userEmitter = new EventEmitter();

// 监听带参数的事件
userEmitter.on('login', (username, time) => {
    console.log(`用户 ${username} 在 ${time} 登录了系统`);
});

// 触发事件并传递参数
userEmitter.emit('login', '张三', new Date().toLocaleTimeString());
userEmitter.emit('login', '李四', new Date().toLocaleTimeString());

// ============================================
// 3. 多个监听器
// ============================================
console.log('\n--- 3. 多个监听器 ---');

const messageEmitter = new EventEmitter();

// 第一个监听器
messageEmitter.on('message', (msg) => {
    console.log('监听器 1:', msg);
});

// 第二个监听器
messageEmitter.on('message', (msg) => {
    console.log('监听器 2:', msg);
});

// 第三个监听器
messageEmitter.on('message', (msg) => {
    console.log('监听器 3:', msg);
});

// 触发事件 - 所有监听器都会被调用
messageEmitter.emit('message', 'Hello, World!');

// ============================================
// 4. once - 只监听一次
// ============================================
console.log('\n--- 4. 只监听一次 ---');

const onceEmitter = new EventEmitter();

onceEmitter.once('firstTime', () => {
    console.log('这条消息只会显示一次');
});

onceEmitter.emit('firstTime'); // 显示
onceEmitter.emit('firstTime'); // 不显示
onceEmitter.emit('firstTime'); // 不显示

// ============================================
// 5. 移除监听器
// ============================================
console.log('\n--- 5. 移除监听器 ---');

const removeEmitter = new EventEmitter();

function listener1() {
    console.log('监听器 1 被调用');
}

function listener2() {
    console.log('监听器 2 被调用');
}

removeEmitter.on('test', listener1);
removeEmitter.on('test', listener2);

console.log('触发事件（两个监听器）:');
removeEmitter.emit('test');

// 移除 listener1
removeEmitter.off('test', listener1);

console.log('移除 listener1 后:');
removeEmitter.emit('test');

// 移除所有监听器
removeEmitter.removeAllListeners('test');

console.log('移除所有监听器后:');
removeEmitter.emit('test');

// ============================================
// 6. 自定义事件发射器类
// ============================================
console.log('\n--- 6. 自定义事件发射器类 ---');

class User extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    login() {
        console.log(`${this.name} 正在登录...`);
        this.emit('login', this.name);
    }

    logout() {
        console.log(`${this.name} 正在登出...`);
        this.emit('logout', this.name);
    }

    sendMessage(message) {
        this.emit('message', this.name, message);
    }
}

const user1 = new User('王五');

// 监听用户登录事件
user1.on('login', (name) => {
    console.log(`✓ ${name} 登录成功`);
});

// 监听用户登出事件
user1.on('logout', (name) => {
    console.log(`✓ ${name} 登出成功`);
});

// 监听消息事件
user1.on('message', (name, msg) => {
    console.log(`📧 ${name} 发送消息: ${msg}`);
});

// 触发事件
user1.login();
user1.sendMessage('Hello, everyone!');
user1.logout();

// ============================================
// 7. 实用示例：订单系统
// ============================================
console.log('\n--- 7. 实用示例：订单系统 ---');

class OrderSystem extends EventEmitter {
    createOrder(orderId, product, amount) {
        console.log(`\n创建订单 ${orderId}: ${product}`);

        // 触发订单创建事件
        this.emit('orderCreated', { orderId, product, amount });

        // 模拟处理延迟
        setTimeout(() => {
            this.emit('orderPaid', { orderId, amount });
        }, 500);

        setTimeout(() => {
            this.emit('orderShipped', { orderId });
        }, 1000);

        setTimeout(() => {
            this.emit('orderDelivered', { orderId });
        }, 1500);
    }
}

const orderSystem = new OrderSystem();

// 订单创建监听器
orderSystem.on('orderCreated', (data) => {
    console.log(`✓ 订单 ${data.orderId} 创建成功`);
    console.log(`  商品: ${data.product}`);
    console.log(`  金额: ¥${data.amount}`);
});

// 支付监听器
orderSystem.on('orderPaid', (data) => {
    console.log(`✓ 订单 ${data.orderId} 支付成功，金额: ¥${data.amount}`);
});

// 发货监听器
orderSystem.on('orderShipped', (data) => {
    console.log(`✓ 订单 ${data.orderId} 已发货`);
});

// 配送监听器
orderSystem.on('orderDelivered', (data) => {
    console.log(`✓ 订单 ${data.orderId} 已送达`);
});

// 创建订单
orderSystem.createOrder('ORD-001', 'MacBook Pro', 12999);

// ============================================
// 8. 错误事件
// ============================================
console.log('\n--- 8. 错误事件 ---');

const errorEmitter = new EventEmitter();

// 监听错误事件（如果不监听，程序会崩溃）
errorEmitter.on('error', (err) => {
    console.error('捕获到错误:', err.message);
});

// 触发错误事件
errorEmitter.emit('error', new Error('发生了一个错误'));

// ============================================
// 9. 事件监听器信息
// ============================================
console.log('\n--- 9. 事件监听器信息 ---');

const infoEmitter = new EventEmitter();

infoEmitter.on('test', () => { });
infoEmitter.on('test', () => { });
infoEmitter.on('test', () => { });

console.log('test 事件的监听器数量:', infoEmitter.listenerCount('test'));
console.log('所有事件名称:', infoEmitter.eventNames());

// 设置最大监听器数量（默认为 10）
infoEmitter.setMaxListeners(20);
console.log('最大监听器数量:', infoEmitter.getMaxListeners());

// ============================================
// 10. Node.js 中使用 EventEmitter 的模块
// ============================================
setTimeout(() => {
    console.log('\n--- 10. Node.js 中的 EventEmitter ---');
    console.log(`
很多 Node.js 核心模块都继承自 EventEmitter:

1. fs.ReadStream / fs.WriteStream
   - 'data', 'end', 'error' 事件

2. http.Server
   - 'request', 'connection', 'close' 事件

3. net.Server
   - 'connection', 'listening', 'error' 事件

4. process
   - 'exit', 'uncaughtException', 'SIGINT' 事件

5. stream.Readable / stream.Writable
   - 'data', 'end', 'finish', 'error' 事件

示例：
const server = http.createServer();
server.on('request', (req, res) => {
    // 处理请求
});
    `);

    // ============================================
    // 知识点总结
    // ============================================
    console.log('\n--- 事件系统总结 ---');
    console.log(`
常用方法:
  on(event, listener)              - 添加监听器
  once(event, listener)            - 添加一次性监听器
  emit(event, [...args])           - 触发事件
  off(event, listener)             - 移除监听器
  removeAllListeners([event])      - 移除所有监听器
  listenerCount(event)             - 获取监听器数量
  eventNames()                     - 获取所有事件名

特殊事件:
  'error'                          - 错误事件（必须监听）
  'newListener'                    - 添加新监听器时触发
  'removeListener'                 - 移除监听器时触发

使用场景:
  - 构建可扩展的应用架构
  - 解耦代码模块
  - 实现观察者模式
  - 处理异步操作的完成通知
    `);
}, 2000);
