const { promisify } = require('util');
const open = require('open');
const path = require('path');

const download = promisify(require('download-git-repo'));

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile,createDirSync } = require('../utils/utils');

/**
 * 创建项目
 * 流程：callback -> promisify(函数) -> Promise -> async await
 * @param project
 * @return {Promise<void>}
 */
const createProjectAction = async (project) => {
  console.log('\x1B[31m%s\x1B[0m', "Your Project are building （。＾▽＾）");

  // 1. clone项目
  await download(vueRepo, project, { clone: true });

  // 2. 执行npm install; 调用进程命令需要用到child_process; 且需要注意window中npm执行命令实际为npm.cmd
  const command = process.platform === "win32" ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` });

  // 3. 执行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4. 打开浏览器(子进程中run serve不会结束，所以会产生堵塞，所以可以让open异步执行)
  open("http://localhost:8080/")
}

const addComponentAction = async (name, dest) => {
  // 1. 编译现存的ejs模板 → result
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});
  console.log(result);

  // 2. 写入文件操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  console.log(targetPath);
  writeToFile(targetPath, result);

}

const addPageAndRouteAction = async (name, dest) => {
  // 1. 编译ejs模板
  const data = {name, lowerName: name.toLowerCase()};
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);

  // 2. 写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath  = path.resolve(targetDest, 'route.js');
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
}

const addStoreAction = async (name, dest) => {
  const storeResult = await compile('vuex-store.ejs', {});
  const typesResult = await compile('vuex-types.ejs', {});

  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath  = path.resolve(targetDest, 'types.js');
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
}


module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}

