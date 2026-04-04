/**
 * 08 - 流 (Stream)
 *
 * 流是 Node.js 中处理数据的强大方式。
 * 流可以高效地处理大量数据，而不需要一次性将所有数据加载到内存中。
 *
 * 运行方式: node 08-stream.js
 */

const fs = require('fs');
const path = require('path');
const { Transform, Writable } = require('stream');

console.log('=== Node.js 流处理 ===\n');

// ============================================
// 准备工作：创建测试目录
// ============================================
const testDir = path.join(__dirname, 'stream-test');
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
}

// ============================================
// 1. 四种流类型
// ============================================
console.log('--- 1. 四种流类型 ---');
console.log(`
1. Readable (可读流)  - 数据的源头，可以读取数据
   示例: fs.createReadStream(), http.IncomingMessage

2. Writable (可写流)  - 数据的终点，可以写入数据
   示例: fs.createWriteStream(), http.ServerResponse

3. Duplex (双工流)    - 既可读又可写
   示例: net.Socket, TCP socket

4. Transform (转换流) - 可以在读写过程中修改数据
   示例: zlib.createGzip(), crypto.createCipher()
`);

// ============================================
// 2. 可读流 (Readable Stream)
// ============================================
console.log('--- 2. 可读流示例 ---');

// 创建一个测试文件
const sourceFile = path.join(testDir, 'source.txt');
const content = '这是测试数据。\n'.repeat(1000);
fs.writeFileSync(sourceFile, content);

console.log('✓ 创建测试文件:', sourceFile);

// 创建可读流
const readStream = fs.createReadStream(sourceFile, {
    encoding: 'utf8',
    highWaterMark: 64 // 每次读取的字节数
});

// 监听 'data' 事件
let chunkCount = 0;
readStream.on('data', (chunk) => {
    chunkCount++;
    if (chunkCount === 1) {
        console.log('✓ 开始读取数据...');
        console.log('  第一块数据长度:', chunk.length, '字节');
    }
});

// 监听 'end' 事件
readStream.on('end', () => {
    console.log(`✓ 读取完成，共读取 ${chunkCount} 块数据`);
});

// 监听 'error' 事件
readStream.on('error', (err) => {
    console.error('✗ 读取错误:', err);
});

// ============================================
// 3. 可写流 (Writable Stream)
// ============================================
console.log('\n--- 3. 可写流示例 ---');

const destFile = path.join(testDir, 'dest.txt');
const writeStream = fs.createWriteStream(destFile);

// 写入数据
writeStream.write('第一行数据\n');
writeStream.write('第二行数据\n');
writeStream.write('第三行数据\n');

// 结束写入
writeStream.end('最后一行数据\n');

writeStream.on('finish', () => {
    console.log('✓ 写入完成:', destFile);
});

writeStream.on('error', (err) => {
    console.error('✗ 写入错误:', err);
});

// ============================================
// 4. 管道 (Pipe) - 连接流
// ============================================
setTimeout(() => {
    console.log('\n--- 4. 管道示例 ---');

    const source = path.join(testDir, 'source.txt');
    const dest = path.join(testDir, 'piped.txt');

    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(dest);

    // 使用管道连接读流和写流
    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('✓ 管道传输完成');

        // 检查文件大小
        const sourceSize = fs.statSync(source).size;
        const destSize = fs.statSync(dest).size;
        console.log(`  源文件: ${sourceSize} 字节`);
        console.log(`  目标文件: ${destSize} 字节`);
    });
}, 500);

// ============================================
// 5. 转换流 (Transform Stream)
// ============================================
setTimeout(() => {
    console.log('\n--- 5. 转换流示例 ---');

    // 创建一个将文本转为大写的转换流
    class UpperCaseTransform extends Transform {
        _transform(chunk, encoding, callback) {
            // 转换数据
            const upperChunk = chunk.toString().toUpperCase();
            this.push(upperChunk);
            callback();
        }
    }

    const source = path.join(testDir, 'source.txt');
    const dest = path.join(testDir, 'uppercase.txt');

    const readStream = fs.createReadStream(source);
    const upperCase = new UpperCaseTransform();
    const writeStream = fs.createWriteStream(dest);

    // 链式管道
    readStream
        .pipe(upperCase)
        .pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('✓ 转换流处理完成');
        console.log('  文件内容已转为大写');
    });
}, 1000);

// ============================================
// 6. 流的优势对比
// ============================================
setTimeout(() => {
    console.log('\n--- 6. 流的优势 ---');

    // 创建一个较大的文件
    const bigFile = path.join(testDir, 'big-file.txt');
    const bigContent = '这是一行很长的数据。'.repeat(100000);
    fs.writeFileSync(bigFile, bigContent);

    const fileSize = fs.statSync(bigFile).size;
    console.log('测试文件大小:', (fileSize / 1024 / 1024).toFixed(2), 'MB');

    // 方式1: 一次性读取（不推荐用于大文件）
    console.log('\n方式1: 一次性读取');
    const startMemory1 = process.memoryUsage().heapUsed;
    const start1 = Date.now();

    fs.readFile(bigFile, 'utf8', (err, data) => {
        if (err) throw err;

        const time1 = Date.now() - start1;
        const endMemory1 = process.memoryUsage().heapUsed;
        const memoryUsed1 = ((endMemory1 - startMemory1) / 1024 / 1024).toFixed(2);

        console.log('  耗时:', time1, 'ms');
        console.log('  内存使用:', memoryUsed1, 'MB');
    });

    // 方式2: 使用流（推荐）
    setTimeout(() => {
        console.log('\n方式2: 使用流');
        const startMemory2 = process.memoryUsage().heapUsed;
        const start2 = Date.now();

        const stream = fs.createReadStream(bigFile, { encoding: 'utf8' });
        let dataLength = 0;

        stream.on('data', (chunk) => {
            dataLength += chunk.length;
        });

        stream.on('end', () => {
            const time2 = Date.now() - start2;
            const endMemory2 = process.memoryUsage().heapUsed;
            const memoryUsed2 = ((endMemory2 - startMemory2) / 1024 / 1024).toFixed(2);

            console.log('  耗时:', time2, 'ms');
            console.log('  内存使用:', memoryUsed2, 'MB');
            console.log('\n结论: 流方式内存占用更少，适合处理大文件');
        });
    }, 500);
}, 1500);

// ============================================
// 7. 流的控制：暂停和恢复
// ============================================
setTimeout(() => {
    console.log('\n--- 7. 流的控制 ---');

    const source = path.join(testDir, 'source.txt');
    const readStream = fs.createReadStream(source, {
        encoding: 'utf8',
        highWaterMark: 64
    });

    readStream.on('data', (chunk) => {
        console.log('读取数据块，长度:', chunk.length);

        // 暂停流
        readStream.pause();
        console.log('流已暂停...');

        // 1秒后恢复
        setTimeout(() => {
            console.log('流已恢复');
            readStream.resume();
        }, 100);
    });

    readStream.on('end', () => {
        console.log('✓ 控制流演示完成');
    });
}, 2500);

// ============================================
// 8. 实用示例：行读取器
// ============================================
setTimeout(() => {
    console.log('\n--- 8. 实用示例：行读取器 ---');

    const readline = require('readline');
    const source = path.join(testDir, 'source.txt');

    const rl = readline.createInterface({
        input: fs.createReadStream(source),
        crlfDelay: Infinity
    });

    let lineCount = 0;
    rl.on('line', (line) => {
        lineCount++;
        if (lineCount <= 3) {
            console.log(`行 ${lineCount}:`, line.substring(0, 30) + '...');
        }
    });

    rl.on('close', () => {
        console.log(`✓ 共读取 ${lineCount} 行`);
    });
}, 3000);

// ============================================
// 9. 自定义可读流
// ============================================
setTimeout(() => {
    console.log('\n--- 9. 自定义可读流 ---');

    const { Readable } = require('stream');

    class CounterStream extends Readable {
        constructor(max) {
            super();
            this.current = 1;
            this.max = max;
        }

        _read() {
            if (this.current <= this.max) {
                this.push(`数字: ${this.current}\n`);
                this.current++;
            } else {
                this.push(null); // 结束流
            }
        }
    }

    const counter = new CounterStream(5);

    counter.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    counter.on('end', () => {
        console.log('✓ 自定义流演示完成');
    });
}, 3500);

// ============================================
// 知识点总结
// ============================================
setTimeout(() => {
    console.log('\n--- 流处理总结 ---');
    console.log(`
流的优势:
  ✓ 节省内存 - 不需要一次性加载所有数据
  ✓ 高效处理 - 边读边处理，提高效率
  ✓ 组合能力 - 可以通过管道连接多个流

常用场景:
  • 读写大文件
  • 网络传输
  • 数据转换
  • 压缩/解压缩
  • 加密/解密

核心方法:
  Readable:
    - on('data', callback)  - 接收数据
    - on('end', callback)   - 读取完成
    - pause()               - 暂停读取
    - resume()              - 恢复读取
    - pipe(destination)     - 管道传输

  Writable:
    - write(chunk)          - 写入数据
    - end([chunk])          - 结束写入
    - on('finish', callback)- 写入完成

  Transform:
    - _transform(chunk, encoding, callback)

最佳实践:
  • 处理大文件时优先使用流
  • 使用 pipe() 连接流
  • 始终监听 'error' 事件
  • 合理设置 highWaterMark
    `);
}, 4000);
