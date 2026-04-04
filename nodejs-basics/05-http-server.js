/**
 * 05 - HTTP 服务器
 *
 * Node.js 的 http 模块可以创建 Web 服务器。
 * 这是 Node.js 最常用的功能之一。
 *
 * 运行方式: node 05-http-server.js
 * 然后在浏览器访问: http://localhost:3000
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

console.log('=== Node.js HTTP 服务器 ===\n');

// ============================================
// 1. 创建最简单的服务器
// ============================================
console.log('--- 1. 最简单的 HTTP 服务器 ---\n');

// 定义端口
const PORT = 3000;
const HOST = 'localhost';

// 创建服务器
const server = http.createServer((req, res) => {
    // req - 请求对象 (IncomingMessage)
    // res - 响应对象 (ServerResponse)

    const requestUrl = url.parse(req.url, true);
    const pathname = requestUrl.pathname;
    const query = requestUrl.query;

    console.log(`收到请求: ${req.method} ${pathname}`);

    // ============================================
    // 2. 路由处理
    // ============================================

    // 首页
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Node.js HTTP 服务器</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background: #f5f5f5;
                    }
                    h1 { color: #333; }
                    .card {
                        background: white;
                        padding: 20px;
                        margin: 10px 0;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    a:hover { text-decoration: underline; }
                    code {
                        background: #f4f4f4;
                        padding: 2px 6px;
                        border-radius: 3px;
                    }
                </style>
            </head>
            <body>
                <h1>🚀 欢迎访问 Node.js HTTP 服务器</h1>

                <div class="card">
                    <h2>测试路由</h2>
                    <ul>
                        <li><a href="/">首页</a></li>
                        <li><a href="/about">关于</a></li>
                        <li><a href="/api/data">API 接口</a></li>
                        <li><a href="/api/user?name=张三&age=25">API 查询参数</a></li>
                        <li><a href="/time">当前时间</a></li>
                        <li><a href="/json">JSON 数据</a></li>
                        <li><a href="/404">404 页面</a></li>
                    </ul>
                </div>

                <div class="card">
                    <h2>请求信息</h2>
                    <p><strong>请求方法:</strong> ${req.method}</p>
                    <p><strong>请求路径:</strong> ${pathname}</p>
                    <p><strong>User-Agent:</strong> ${req.headers['user-agent']}</p>
                </div>

                <div class="card">
                    <h2>如何停止服务器</h2>
                    <p>在终端按 <code>Ctrl + C</code> 停止服务器</p>
                </div>
            </body>
            </html>
        `);
    }

    // 关于页面
    else if (pathname === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>关于</title>
            </head>
            <body>
                <h1>关于我们</h1>
                <p>这是一个 Node.js HTTP 服务器示例</p>
                <p><a href="/">返回首页</a></p>
            </body>
            </html>
        `);
    }

    // API 接口 - 返回 JSON
    else if (pathname === '/api/data') {
        const data = {
            message: '这是 API 返回的数据',
            timestamp: new Date().toISOString(),
            server: 'Node.js HTTP Server',
            version: '1.0.0'
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data, null, 2));
    }

    // API 接口 - 带查询参数
    else if (pathname === '/api/user') {
        const name = query.name || '游客';
        const age = query.age || '未知';

        const userData = {
            name: name,
            age: age,
            message: `你好，${name}！你今年 ${age} 岁。`,
            receivedAt: new Date().toLocaleString('zh-CN')
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(userData, null, 2));
    }

    // 当前时间
    else if (pathname === '/time') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>当前时间</title>
            </head>
            <body>
                <h1>当前服务器时间</h1>
                <p>${new Date().toLocaleString('zh-CN')}</p>
                <p><a href="/">返回首页</a></p>
            </body>
            </html>
        `);
    }

    // JSON 数据示例
    else if (pathname === '/json') {
        const jsonData = {
            students: [
                { id: 1, name: '张三', score: 95 },
                { id: 2, name: '李四', score: 88 },
                { id: 3, name: '王五', score: 92 }
            ],
            total: 3,
            timestamp: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(jsonData, null, 2));
    }

    // 404 页面
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>404 Not Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 50px;
                    }
                    h1 { font-size: 72px; color: #e74c3c; }
                </style>
            </head>
            <body>
                <h1>404</h1>
                <h2>页面未找到</h2>
                <p>请求的路径: ${pathname}</p>
                <p><a href="/">返回首页</a></p>
            </body>
            </html>
        `);
    }
});

// ============================================
// 3. 启动服务器
// ============================================
server.listen(PORT, HOST, () => {
    console.log(`✓ HTTP 服务器已启动！`);
    console.log(`✓ 访问地址: http://${HOST}:${PORT}`);
    console.log(`✓ 按 Ctrl+C 停止服务器\n`);
    console.log('可用路由:');
    console.log(`  http://${HOST}:${PORT}/`);
    console.log(`  http://${HOST}:${PORT}/about`);
    console.log(`  http://${HOST}:${PORT}/api/data`);
    console.log(`  http://${HOST}:${PORT}/api/user?name=张三&age=25`);
    console.log(`  http://${HOST}:${PORT}/time`);
    console.log(`  http://${HOST}:${PORT}/json`);
    console.log('');
});

// ============================================
// 4. 错误处理
// ============================================
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`✗ 端口 ${PORT} 已被占用，请尝试其他端口`);
    } else {
        console.error('✗ 服务器错误:', err);
    }
});

// ============================================
// 5. 优雅关闭
// ============================================
process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    server.close(() => {
        console.log('✓ 服务器已关闭');
        process.exit(0);
    });
});

// ============================================
// HTTP 模块知识点总结
// ============================================
console.log('--- HTTP 模块知识点 ---\n');
console.log(`
创建服务器:
  http.createServer(callback) - 创建 HTTP 服务器
  server.listen(port, host)   - 启动服务器监听

请求对象 (req):
  req.method      - 请求方法 (GET, POST, PUT, DELETE)
  req.url         - 请求 URL
  req.headers     - 请求头
  req.on('data')  - 接收数据
  req.on('end')   - 数据接收完毕

响应对象 (res):
  res.writeHead(statusCode, headers) - 写入响应头
  res.write(data)                    - 写入响应体
  res.end(data)                      - 结束响应
  res.statusCode                     - 设置状态码
  res.setHeader(name, value)         - 设置响应头

常见状态码:
  200 - OK
  201 - Created
  301 - Moved Permanently
  302 - Found
  304 - Not Modified
  400 - Bad Request
  401 - Unauthorized
  403 - Forbidden
  404 - Not Found
  500 - Internal Server Error
  503 - Service Unavailable
`);
