/**
 * 03 - 文件系统操作 (File System)
 *
 * Node.js 的 fs 模块提供了文件系统操作的 API。
 * 大多数方法有同步和异步两种形式。
 *
 * 运行方式: node 03-fs-file-operations.js
 */

const fs = require('fs');
const path = require('path');

console.log('=== Node.js 文件系统操作 ===\n');

// ============================================
// 1. 创建测试目录和文件
// ============================================
console.log('--- 1. 创建目录和文件 ---');

const testDir = path.join(__dirname, 'test-files');
const testFile = path.join(testDir, 'example.txt');

// 同步创建目录（如果不存在）
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
    console.log('✓ 创建目录:', testDir);
} else {
    console.log('✓ 目录已存在:', testDir);
}

// ============================================
// 2. 写入文件
// ============================================
console.log('\n--- 2. 写入文件 ---');

// 同步写入
const content1 = 'Hello, Node.js!\n这是第一行文本。\n';
fs.writeFileSync(testFile, content1);
console.log('✓ 同步写入文件成功');

// 异步写入（追加内容）
const content2 = '这是追加的内容。\n';
fs.appendFile(testFile, content2, (err) => {
    if (err) {
        console.error('✗ 追加文件失败:', err);
    } else {
        console.log('✓ 异步追加文件成功');
    }
});

// ============================================
// 3. 读取文件
// ============================================
console.log('\n--- 3. 读取文件 ---');

// 同步读取
try {
    const data = fs.readFileSync(testFile, 'utf8');
    console.log('✓ 同步读取文件内容:');
    console.log(data);
} catch (err) {
    console.error('✗ 读取文件失败:', err);
}

// 异步读取
fs.readFile(testFile, 'utf8', (err, data) => {
    if (err) {
        console.error('✗ 异步读取失败:', err);
        return;
    }
    console.log('✓ 异步读取文件内容:');
    console.log(data);
});

// ============================================
// 4. 文件信息
// ============================================
console.log('--- 4. 获取文件信息 ---');

const stats = fs.statSync(testFile);
console.log('文件大小:', stats.size, '字节');
console.log('是否为文件:', stats.isFile());
console.log('是否为目录:', stats.isDirectory());
console.log('创建时间:', stats.birthtime);
console.log('修改时间:', stats.mtime);

// ============================================
// 5. 检查文件/目录是否存在
// ============================================
console.log('\n--- 5. 检查存在性 ---');

console.log('文件存在:', fs.existsSync(testFile));
console.log('目录存在:', fs.existsSync(testDir));
console.log('不存在的路径:', fs.existsSync(path.join(__dirname, 'not-exist.txt')));

// ============================================
// 6. 列出目录内容
// ============================================
console.log('\n--- 6. 列出目录内容 ---');

// 创建几个示例文件
fs.writeFileSync(path.join(testDir, 'file1.txt'), 'File 1');
fs.writeFileSync(path.join(testDir, 'file2.txt'), 'File 2');
fs.writeFileSync(path.join(testDir, 'data.json'), '{"name": "test"}');

const files = fs.readdirSync(testDir);
console.log('目录中的文件:');
files.forEach(file => {
    const filePath = path.join(testDir, file);
    const stat = fs.statSync(filePath);
    const type = stat.isDirectory() ? '[目录]' : '[文件]';
    console.log(`  ${type} ${file}`);
});

// ============================================
// 7. 复制文件
// ============================================
console.log('\n--- 7. 复制文件 ---');

const sourceFile = testFile;
const destFile = path.join(testDir, 'example-copy.txt');

fs.copyFileSync(sourceFile, destFile);
console.log('✓ 文件复制成功:', destFile);

// ============================================
// 8. 重命名/移动文件
// ============================================
console.log('\n--- 8. 重命名文件 ---');

const oldPath = destFile;
const newPath = path.join(testDir, 'renamed-file.txt');

fs.renameSync(oldPath, newPath);
console.log('✓ 文件重命名成功:', newPath);

// ============================================
// 9. 删除文件
// ============================================
console.log('\n--- 9. 删除文件 ---');

fs.unlinkSync(newPath);
console.log('✓ 删除文件成功:', newPath);

// ============================================
// 10. Promise API (现代异步方式)
// ============================================
console.log('\n--- 10. Promise API ---');

const fsPromises = fs.promises;

async function modernFileOperations() {
    try {
        // 使用 async/await 进行文件操作
        const modernFile = path.join(testDir, 'modern.txt');

        // 写入
        await fsPromises.writeFile(modernFile, 'Hello from Promise API!');
        console.log('✓ Promise: 写入成功');

        // 读取
        const content = await fsPromises.readFile(modernFile, 'utf8');
        console.log('✓ Promise: 读取内容:', content);

        // 删除
        await fsPromises.unlink(modernFile);
        console.log('✓ Promise: 删除成功');

    } catch (err) {
        console.error('✗ Promise 操作失败:', err);
    }
}

modernFileOperations();

// ============================================
// 11. 读写 JSON 文件
// ============================================
console.log('\n--- 11. JSON 文件操作 ---');

const jsonFile = path.join(testDir, 'data.json');
const jsonData = {
    name: 'Node.js',
    version: '1.0.0',
    features: ['异步', '事件驱动', '高性能'],
    created: new Date().toISOString()
};

// 写入 JSON
fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
console.log('✓ JSON 文件写入成功');

// 读取 JSON
const readData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
console.log('✓ JSON 文件读取成功:');
console.log(readData);

// ============================================
// 12. 文件流（适合大文件）
// ============================================
console.log('\n--- 12. 文件流 ---');

const streamFile = path.join(testDir, 'stream.txt');
const writeStream = fs.createWriteStream(streamFile);

writeStream.write('使用流写入数据...\n');
writeStream.write('流适合处理大文件\n');
writeStream.write('不会一次性占用大量内存\n');
writeStream.end();

writeStream.on('finish', () => {
    console.log('✓ 流写入完成');

    // 使用流读取
    const readStream = fs.createReadStream(streamFile, 'utf8');
    console.log('✓ 流读取内容:');

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\n✓ 流读取完成');
    });
});

// ============================================
// 常用方法总结
// ============================================
console.log('\n--- 常用方法总结 ---');
console.log(`
同步方法（Sync 后缀）：
  fs.readFileSync()     - 读取文件
  fs.writeFileSync()    - 写入文件
  fs.appendFileSync()   - 追加内容
  fs.unlinkSync()       - 删除文件
  fs.readdirSync()      - 读取目录
  fs.mkdirSync()        - 创建目录
  fs.statSync()         - 获取文件信息
  fs.existsSync()       - 检查是否存在

异步方法（回调方式）：
  fs.readFile()         - 读取文件
  fs.writeFile()        - 写入文件
  fs.appendFile()       - 追加内容
  fs.unlink()           - 删除文件
  fs.readdir()          - 读取目录
  fs.mkdir()            - 创建目录
  fs.stat()             - 获取文件信息

Promise 方法（推荐）：
  fs.promises.readFile()
  fs.promises.writeFile()
  fs.promises.appendFile()
  fs.promises.unlink()
  fs.promises.readdir()
  fs.promises.mkdir()
  fs.promises.stat()
`);

console.log('\n提示：运行这个文件后，会在当前目录创建 test-files 文件夹\n');
