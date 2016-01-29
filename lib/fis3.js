const fs = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;
const log = require('./log')();

var cwd = process.cwd();
var buildPath = path.join(cwd, 'build');

module.exports = {
    /**
     * fis3构建
     */
    build: function() {
        var fis_conf = path.join(cwd, 'fis-conf.js');

        if (!fs.existsSync(fis_conf)) {
            return log.error('无fis配置文件');
        }

        fs.ensureDirSync(buildPath);
        var ps = spawn('fis3b', ['release', 'local', '-d', './build', '--clean', '--watch'], {
            env: process.env,
            cwd: cwd
        });

        ps.stdout.on('data', function(data) {
            log.info('fis3 build info >>>' + data.toString());
        });
        ps.on('exit', function(err) {
            if (err) {
                return log.error('构建出错');
            }
        });
    }
};

