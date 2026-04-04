/**
 * 04 - Path 路径处理模块
 *
 * path 模块提供了处理文件路径的实用工具。
 * 可以跨平台处理路径（Windows 和 Unix/Linux/macOS 的路径分隔符不同）
 *
 * 运行方式: node 04-path-module.js
 */

const path = require('path');

console.log('=== Node.js Path 路径模块 ===\n');

// ============================================
// 1. 路径分隔符
// ============================================
console.log('--- 1. 路径分隔符 ---');
console.log('当前系统的路径分隔符:', path.sep);
console.log('环境变量分隔符:', path.delimiter);
console.log('Windows 使用 \\，Unix/Linux/macOS 使用 /');

// ============================================
// 2. 路径拼接 - path.join()
// ============================================
console.log('\n--- 2. 路径拼接 (join) ---');

const joined1 = path.join('/users', 'dch', 'documents', 'file.txt');
console.log('拼接路径 1:', joined1);

const joined2 = path.join(__dirname, 'data', 'test.txt');
console.log('拼接路径 2:', joined2);

// join 会处理多余的分隔符和 . 、 ..
const joined3 = path.join('/users', '/dch/', '../tom/', './files', 'data.json');
console.log('处理特殊字符:', joined3);

// ============================================
// 3. 路径解析 - path.resolve()
// ============================================
console.log('\n--- 3. 路径解析 (resolve) ---');

const resolved1 = path.resolve('file.txt');
console.log('解析相对路径:', resolved1);

const resolved2 = path.resolve('/users', 'dch', 'file.txt');
console.log('解析绝对路径:', resolved2);

const resolved3 = path.resolve('dir1', 'dir2', '../file.txt');
console.log('解析复杂路径:', resolved3);

console.log('\njoin vs resolve 的区别:');
console.log('join 只是简单拼接，resolve 会解析为绝对路径');

// ============================================
// 4. 获取路径信息
// ============================================
console.log('\n--- 4. 获取路径信息 ---');

const filePath = '/users/dch/projects/nodejs-basics/example.txt';

console.log('原始路径:', filePath);
console.log('目录名 (dirname):', path.dirname(filePath));
console.log('文件名 (basename):', path.basename(filePath));
console.log('扩展名 (extname):', path.extname(filePath));
console.log('不带扩展名的文件名:', path.basename(filePath, path.extname(filePath)));

// ============================================
// 5. 解析路径对象 - path.parse()
// ============================================
console.log('\n--- 5. 解析路径对象 (parse) ---');

const pathObj = path.parse(filePath);
console.log('路径对象:', pathObj);
console.log('  root:', pathObj.root);      // 根路径
console.log('  dir:', pathObj.dir);        // 目录
console.log('  base:', pathObj.base);      // 文件名（含扩展名）
console.log('  name:', pathObj.name);      // 文件名（不含扩展名）
console.log('  ext:', pathObj.ext);        // 扩展名

// ============================================
// 6. 格式化路径对象 - path.format()
// ============================================
console.log('\n--- 6. 格式化路径对象 (format) ---');

const newPathObj = {
    root: '/',
    dir: '/users/dch/projects',
    base: 'newfile.js',
    name: 'newfile',
    ext: '.js'
};

const formatted = path.format(newPathObj);
console.log('格式化后的路径:', formatted);

// ============================================
// 7. 规范化路径 - path.normalize()
// ============================================
console.log('\n--- 7. 规范化路径 (normalize) ---');

const messy1 = '/users//dch/./projects/../files/data.txt';
console.log('混乱路径:', messy1);
console.log('规范化后:', path.normalize(messy1));

const messy2 = 'users\\\\dch\\..\\tom\\files';
console.log('混乱路径:', messy2);
console.log('规范化后:', path.normalize(messy2));

// ============================================
// 8. 判断是否为绝对路径 - path.isAbsolute()
// ============================================
console.log('\n--- 8. 判断绝对路径 (isAbsolute) ---');

console.log('/users/dch 是绝对路径:', path.isAbsolute('/users/dch'));
console.log('./files 是绝对路径:', path.isAbsolute('./files'));
console.log('file.txt 是绝对路径:', path.isAbsolute('file.txt'));

// ============================================
// 9. 计算相对路径 - path.relative()
// ============================================
console.log('\n--- 9. 计算相对路径 (relative) ---');

const from1 = '/users/dch/projects';
const to1 = '/users/dch/documents/file.txt';
console.log(`从 ${from1}`);
console.log(`到 ${to1}`);
console.log('相对路径:', path.relative(from1, to1));

const from2 = '/users/dch/projects/app/src';
const to2 = '/users/dch/projects/app/public/index.html';
console.log(`\n从 ${from2}`);
console.log(`到 ${to2}`);
console.log('相对路径:', path.relative(from2, to2));

// ============================================
// 10. 全局变量 __dirname 和 __filename
// ============================================
console.log('\n--- 10. 全局路径变量 ---');

console.log('__dirname (当前目录):', __dirname);
console.log('__filename (当前文件):', __filename);

console.log('\n使用场景:');
console.log('读取同目录文件:', path.join(__dirname, 'config.json'));
console.log('读取上级目录文件:', path.join(__dirname, '..', 'package.json'));
console.log('读取子目录文件:', path.join(__dirname, 'data', 'users.json'));

// ============================================
// 11. 实用示例
// ============================================
console.log('\n--- 11. 实用示例 ---');

// 示例1: 构建配置文件路径
const configPath = path.join(__dirname, 'config', 'database.json');
console.log('配置文件路径:', configPath);

// 示例2: 处理上传文件路径
const uploadFileName = 'photo.jpg';
const uploadDir = path.join(__dirname, 'uploads');
const uploadPath = path.join(uploadDir, uploadFileName);
console.log('上传文件路径:', uploadPath);

// 示例3: 改变文件扩展名
const originalFile = '/users/dch/document.txt';
const parsed = path.parse(originalFile);
parsed.base = parsed.name + '.pdf';
parsed.ext = '.pdf';
const newFile = path.format(parsed);
console.log('原文件:', originalFile);
console.log('改为 PDF:', newFile);

// 示例4: 安全的路径拼接（防止路径遍历攻击）
function safeJoin(base, userPath) {
    const result = path.normalize(path.join(base, userPath));
    if (!result.startsWith(base)) {
        throw new Error('非法路径访问');
    }
    return result;
}

const baseDir = '/var/www/uploads';
try {
    console.log('\n安全路径示例:');
    console.log('正常路径:', safeJoin(baseDir, 'images/photo.jpg'));
    // console.log('攻击路径:', safeJoin(baseDir, '../../etc/passwd')); // 会抛出错误
} catch (err) {
    console.log('检测到路径遍历攻击:', err.message);
}

// ============================================
// 常用方法总结
// ============================================
console.log('\n--- 常用方法总结 ---');
console.log(`
路径拼接:
  path.join()      - 拼接路径，处理分隔符
  path.resolve()   - 解析为绝对路径

路径信息:
  path.dirname()   - 获取目录名
  path.basename()  - 获取文件名
  path.extname()   - 获取扩展名

路径转换:
  path.parse()     - 解析为对象
  path.format()    - 对象转路径
  path.normalize() - 规范化路径
  path.relative()  - 计算相对路径

路径判断:
  path.isAbsolute() - 是否绝对路径

系统相关:
  path.sep         - 路径分隔符
  path.delimiter   - 环境变量分隔符

全局变量:
  __dirname        - 当前文件所在目录
  __filename       - 当前文件完整路径
`);

console.log('\nPath 模块学习完成！接下来学习创建 HTTP 服务器。\n');
