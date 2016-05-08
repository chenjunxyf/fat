/* 工具方法 */
const path = require('path');
const fs = require('fs');
const log = require('./log')();
const spawn = require('child_process').spawn;

var cwd = process.cwd();

module.exports = {
    // 获取本地配置
    getLocalConf: function() {
        var localConfigFile = path.join(process.cwd(), 'fat-config.js');
        if (fs.existsSync(localConfigFile)) {
            return require(localConfigFile);
        } else {
            // 第一次启动时，可考虑复制配置文件模板到当前目录下
            log.error('无配置文件');
            return false;
        }
    },

    // 启动本地监听子进程
    executeWorkers: function(workers) {
        workers.forEach(function(cur, index, arr) {
            if (cur.on) {
                var ps = spawn(cur.command, cur.args, {
                    env: process.env,
                    cwd: cwd
                });
            }
        });
    }
}