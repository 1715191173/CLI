/**
 * 执行终端命令
 * 需要用到node中的 child_process 的 spawn方法
 * 该方法传入三个参数 child_process.spawn(command[, args][, options])
 */
const { spawn } = require('child_process');

// ...args 解构参数数组
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);

    // 将调用的其他进程的信息 在本进程中显示
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    // 监听执行完操作
    childProcess.on("close", () => {

      // 可以理解为执行下一个异步操作
      resolve();
    })
  })
}

module.exports = {
  commandSpawn
}