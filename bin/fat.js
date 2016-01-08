#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('-p, --port', 'set moniter port');

// 全局帮助  
program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ fat -h');
  console.log('    $ fat init');
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
    .usage('[options]')
    .option('-dj', '启动django服务')
    .option('-hd', '启动handlebar服务')
    .action(function(options) {
        console.log('start django');
    }).on('--help', function() {
        console.log('  Examples:');
        console.log();
        console.log('    $ fat server -dj');
        console.log('    $ fat server -hd');
        console.log();
    });

// 项目构建
program.command('build')
    .description('本地构建')
    .action(function(options) {

    });

// 代码合并前审查
program.command('push')
    .description('提交代码到Gerrit')
    .action(function(options) {

    });




 
program.parse(process.argv);
 
