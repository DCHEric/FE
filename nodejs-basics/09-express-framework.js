/**
 * Express 框架详解
 * Express 是 Node.js 最流行的 Web 应用框架
 *
 * 安装: npm install express
 */

// ============================================
// 1. Express 基础 - 创建第一个 Express 应用
// ============================================

const express = require('express');
const app = express();

// 最简单的路由
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// 启动服务器
const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`服务器运行在 http://localhost:${PORT}`);
// });


// ============================================
// 2. 路由管理 - HTTP 方法和路由参数
// ============================================

// GET 请求 - 获取数据
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' }
  ]);
});

// POST 请求 - 创建数据
app.post('/users', (req, res) => {
  // req.body 包含请求体数据(需要中间件解析)
  res.status(201).json({ message: '用户创建成功', data: req.body });
});

// PUT 请求 - 更新数据
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;  // 获取路由参数
  res.json({ message: `更新用户 ${userId}`, data: req.body });
});

// DELETE 请求 - 删除数据
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `删除用户 ${userId}` });
});

// 路由参数示例 - 多个参数
app.get('/posts/:year/:month/:day', (req, res) => {
  const { year, month, day } = req.params;
  res.send(`查询日期: ${year}-${month}-${day} 的文章`);
});

// 查询字符串参数
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  res.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit)
  });
  // 访问: /search?q=express&page=2&limit=20
});


// ============================================
// 3. 中间件 (Middleware) - Express 的核心
// ============================================

// 中间件是处理请求的函数,可以访问 req、res 和 next

// 全局中间件 - 记录所有请求
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();  // 调用 next() 传递给下一个中间件
});

// 解析 JSON 请求体
app.use(express.json());

// 解析 URL 编码的请求体 (表单数据)
app.use(express.urlencoded({ extended: true }));

// 静态文件中间件 - 托管静态资源
app.use('/static', express.static('public'));
// 访问: http://localhost:3000/static/style.css 对应 public/style.css

// 自定义中间件 - 身份验证示例
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: '未提供认证令牌' });
  }

  // 验证 token (这里简化处理)
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: '张三' };  // 将用户信息附加到请求
    next();
  } else {
    res.status(403).json({ error: '无效的令牌' });
  }
};

// 应用中间件到特定路由
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: '这是受保护的资源', user: req.user });
});

// 路由级中间件 - 针对特定路径
app.use('/api', (req, res, next) => {
  console.log('API 路由被访问');
  next();
});


// ============================================
// 4. 请求对象 (req) 详解
// ============================================

app.get('/request-demo', (req, res) => {
  const requestInfo = {
    // 基本信息
    method: req.method,           // HTTP 方法
    url: req.url,                 // 完整 URL
    path: req.path,               // 路径部分
    hostname: req.hostname,       // 主机名
    ip: req.ip,                   // 客户端 IP

    // 参数
    params: req.params,           // 路由参数 /users/:id
    query: req.query,             // 查询字符串 ?name=value
    body: req.body,               // 请求体 (需中间件)

    // 请求头
    headers: req.headers,         // 所有请求头
    userAgent: req.get('User-Agent'),  // 特定请求头

    // 其他
    protocol: req.protocol,       // http 或 https
    secure: req.secure,           // 是否是 HTTPS
    cookies: req.cookies          // Cookie (需 cookie-parser)
  };

  res.json(requestInfo);
});


// ============================================
// 5. 响应对象 (res) 详解
// ============================================

app.get('/response-demo', (req, res) => {
  // 发送响应的各种方法:

  // res.send('文本内容');               // 发送字符串
  // res.json({ key: 'value' });        // 发送 JSON
  // res.status(404).send('Not Found'); // 设置状态码
  // res.sendFile('/path/to/file.html'); // 发送文件
  // res.download('/path/to/file.pdf'); // 下载文件
  // res.redirect('/other-page');       // 重定向

  // 设置响应头
  res.set('X-Custom-Header', 'CustomValue');

  // 链式调用
  res
    .status(200)
    .type('application/json')
    .json({ message: '响应示例' });
});

// 不同类型的响应
app.get('/json', (req, res) => {
  res.json({ name: '张三', age: 25 });
});

app.get('/html', (req, res) => {
  res.send('<h1>HTML 响应</h1><p>这是 HTML 内容</p>');
});

app.get('/redirect-demo', (req, res) => {
  res.redirect('https://www.example.com');
});

app.get('/download-demo', (req, res) => {
  // 假设有一个文件要下载
  res.download('./package.json', 'package-download.json', (err) => {
    if (err) {
      console.error('下载失败:', err);
    }
  });
});


// ============================================
// 6. 路由组织 - Express Router
// ============================================

// 创建路由模块
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json({ message: '用户列表' });
});

userRouter.get('/:id', (req, res) => {
  res.json({ message: `用户详情: ${req.params.id}` });
});

userRouter.post('/', (req, res) => {
  res.status(201).json({ message: '创建用户' });
});

// 挂载路由模块
app.use('/api/users', userRouter);

// 产品路由
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  res.json({ message: '产品列表' });
});

productRouter.get('/:id', (req, res) => {
  res.json({ message: `产品详情: ${req.params.id}` });
});

app.use('/api/products', productRouter);


// ============================================
// 7. 错误处理中间件
// ============================================

// 同步错误会自动被 Express 捕获
app.get('/sync-error', (req, res) => {
  throw new Error('这是一个同步错误');
});

// 异步错误需要显式传递给 next
app.get('/async-error', async (req, res, next) => {
  try {
    // 模拟异步操作
    await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('异步错误')), 100);
    });
  } catch (error) {
    next(error);  // 传递错误给错误处理中间件
  }
});

// 404 处理 - 放在所有路由之后
app.use((req, res, next) => {
  res.status(404).json({
    error: '页面未找到',
    path: req.url
  });
});

// 错误处理中间件 - 必须有 4 个参数
app.use((err, req, res, next) => {
  console.error('错误:', err.message);
  console.error('堆栈:', err.stack);

  // 根据错误类型返回不同响应
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: '验证错误',
      details: err.message
    });
  }

  // 通用错误响应
  res.status(err.status || 500).json({
    error: err.message || '服务器内部错误',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


// ============================================
// 8. RESTful API 完整示例
// ============================================

// 模拟数据库
let todos = [
  { id: 1, title: '学习 Node.js', completed: false },
  { id: 2, title: '学习 Express', completed: false },
  { id: 3, title: '构建 API', completed: false }
];

let nextId = 4;

// GET /api/todos - 获取所有待办事项
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id - 获取单个待办事项
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: '待办事项未找到' });
  }

  res.json(todo);
});

// POST /api/todos - 创建待办事项
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: '标题不能为空' });
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - 更新待办事项
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: '待办事项未找到' });
  }

  if (title !== undefined) todos[todoIndex].title = title;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
});

// DELETE /api/todos/:id - 删除待办事项
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: '待办事项未找到' });
  }

  const deleted = todos.splice(todoIndex, 1)[0];
  res.json({ message: '删除成功', todo: deleted });
});


// ============================================
// 9. 应用配置和环境变量
// ============================================

// 设置应用配置
app.set('view engine', 'ejs');  // 设置模板引擎
app.set('views', './views');     // 设置模板目录

// 环境判断
if (process.env.NODE_ENV === 'production') {
  // 生产环境配置
  app.set('trust proxy', 1);
} else {
  // 开发环境配置
  app.locals.pretty = true;  // 格式化 HTML 输出
}


// ============================================
// 10. 常用第三方中间件
// ============================================

/**
 * 常用中间件推荐:
 *
 * 1. body-parser (已内置在 express 中)
 *    - express.json()
 *    - express.urlencoded()
 *
 * 2. cors - 处理跨域请求
 *    const cors = require('cors');
 *    app.use(cors());
 *
 * 3. helmet - 增强安全性
 *    const helmet = require('helmet');
 *    app.use(helmet());
 *
 * 4. morgan - HTTP 请求日志
 *    const morgan = require('morgan');
 *    app.use(morgan('dev'));
 *
 * 5. compression - 启用 Gzip 压缩
 *    const compression = require('compression');
 *    app.use(compression());
 *
 * 6. cookie-parser - 解析 Cookie
 *    const cookieParser = require('cookie-parser');
 *    app.use(cookieParser());
 *
 * 7. express-validator - 数据验证
 *    const { body, validationResult } = require('express-validator');
 *
 * 8. multer - 文件上传
 *    const multer = require('multer');
 *    const upload = multer({ dest: 'uploads/' });
 */


// ============================================
// 11. 实际项目结构建议
// ============================================

/**
 * 推荐的项目结构:
 *
 * project/
 * ├── src/
 * │   ├── controllers/      # 控制器 - 业务逻辑
 * │   │   ├── userController.js
 * │   │   └── productController.js
 * │   ├── routes/          # 路由定义
 * │   │   ├── userRoutes.js
 * │   │   └── productRoutes.js
 * │   ├── models/          # 数据模型
 * │   │   ├── User.js
 * │   │   └── Product.js
 * │   ├── middleware/      # 自定义中间件
 * │   │   ├── auth.js
 * │   │   └── validation.js
 * │   ├── config/          # 配置文件
 * │   │   └── database.js
 * │   ├── utils/           # 工具函数
 * │   │   └── helpers.js
 * │   └── app.js           # Express 应用配置
 * ├── public/              # 静态资源
 * │   ├── css/
 * │   ├── js/
 * │   └── images/
 * ├── views/               # 模板文件
 * ├── tests/               # 测试文件
 * ├── .env                 # 环境变量
 * ├── .gitignore
 * ├── package.json
 * └── server.js            # 入口文件
 */


// ============================================
// 12. 启动服务器
// ============================================

// 只在直接运行此文件时启动服务器
if (require.main === module) {
  const SERVER_PORT = process.env.PORT || 3000;

  app.listen(SERVER_PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Express 服务器已启动                  ║
║   地址: http://localhost:${SERVER_PORT}        ║
║                                        ║
║   测试路由:                             ║
║   GET  /                               ║
║   GET  /users                          ║
║   GET  /search?q=test                  ║
║   GET  /request-demo                   ║
║   GET  /api/todos                      ║
║   POST /api/todos                      ║
║                                        ║
║   按 Ctrl+C 停止服务器                  ║
�════════════════════════════════════════╝
    `);
  });
}

// 导出 app 以便测试
module.exports = app;


// ============================================
// 使用示例和测试
// ============================================

/**
 * 测试 API 的方法:
 *
 * 1. 使用 curl:
 *    curl http://localhost:3000/api/todos
 *    curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"新任务"}'
 *
 * 2. 使用 Postman 或 Insomnia (GUI 工具)
 *
 * 3. 使用浏览器 (仅 GET 请求)
 *
 * 4. 使用 axios 或 fetch (在前端):
 *    fetch('http://localhost:3000/api/todos')
 *      .then(res => res.json())
 *      .then(data => console.log(data));
 */
