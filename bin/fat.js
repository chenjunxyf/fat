#!/usr/bin/env node

const program = require('commander');
const open = require('open');
const pkg = require('../package.json');
const util = require('../lib/util');

program.version(pkg.version, '-v, --version');

// 全局帮助  
program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ fat -h');
  console.log('    $ fat init [type]');
  console.log('    $ fat server');
  console.log('    $ fat build');
  console.log('    $ fat push');
  console.log('');
});

// 脚手架
program.command('init [type]')
    .description('项目脚手架')
    .action(function(type) {
        require('../lib/init.js').init(type);
    })
    .on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ fat init bui');
        console.log();
    });

// 启动本地服务
program.command('server')
    .description('启动本地开发服务器')
    .action(function() {
      var config = util.getLocalConf();

      if (config === false) return;

      if (config.build.on) {
        require('../lib/fis3.js').build('local', './build', true);
      }

      require('../lib/server.js').start();

      setTimeout(function() {
        open('http://localhost:' + config.port);
      }, 5000);

    }).on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ fat server');
        console.log();
    });

// 项目构建
program.command('build [type]')
    .description('本地构建')
    .option('-d, --destination [destination]', '查看构建后文件结构，分为local和online')
    .action(function(type, options) {
      require('../lib/fis3.js').build(type, options.destination, false);
    });

// 代码合并前审查
program.command('push [name]')
    .description('提交代码到Gerrit')
    .action(function(name) {

    });

 
program.parse(process.argv);
 
