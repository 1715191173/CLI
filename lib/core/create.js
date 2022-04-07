const program = require('commander');

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./action')

const createCommand = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);

  program
    .command('addcpn <cpnName>')

    // -d是在 help.js 中已经定义
    .description('add a vue component, for example: zanbanya addcpn HelloWorld [-d src/components]')

    // 参数自动获取命令中的 cpnName，所以该参数名称与命令中的<cpnName>不想关
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components');
    });

  program
    .command('addpage <page>')
    .description('add a vue page and router config, for example: zanbanya addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.dest || 'src/pages');
    });

  program
    .command('addstore <store>')
    .description('add a vuex js, for example: zanbanya addstore Home [-d src/pages]')
    .action((store) => {
      addStoreAction(store, program.store || 'src/store/modules')
    });
}

module.exports = createCommand;