/* 工具方法 */
const path = require('path');
const fs = require('fs');
const log = require('./log')();

module.exports = {
    getLocalConf: function() {
        var localConfigFile = path.join(process.cwd(), 'fat-config.js');
        if (fs.existsSync(localConfigFile)) {
            return require(localConfigFile);
        } else {
            // 第一次启动时，可考虑复制配置文件模板到当前目录下
            log.error('无配置文件');
            return false;
        }
    } 
}