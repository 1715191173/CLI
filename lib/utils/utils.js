const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const compile = (templateName, data) => {
  const templatePosition = `../template/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(result);
    });
  })
}

// 递归创建文件夹
const createDirSync = (targetPath) => {
  if (fs.existsSync(targetPath)) {
    return true;
  } else {

    // 当路径存在，返回true之后 就是if(true)
    if ( createDirSync(path.dirname(targetPath)) ) {
      fs.mkdirSync(targetPath);
      return true;
    }
  }
}

const  writeToFile = (path, content) => {
  // 判断path是否存在，不存在则创建文件夹
  return fs.promises.writeFile(path, content);
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}