const program = require('commander');

const {} = require('./action')

const helpOptions = () => {
  program.option('-d --dest <dest>', 'a destination folder, such as: -d /src/components')
  program.option('-f --framework <framework>', 'your framework')

  program.on('--help', function () {
    console.log("");
    console.log("Other:");
    console.log("  other options~");
  })
}

module.exports = helpOptions