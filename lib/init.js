const fs = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;
const co = require('co');
const log = require('./log')();

const currentDir = process.cwd();
const currentTmp = path.join(currentDir, 'fattmp');
const tmpDirectory = path.join(currentTmp, String((+new Date)));

module.exports = {
    /**
     * 脚手架初始化
     * @param  {[String]} type        [模板类型]
     */
    init: function(type) {
        if (type === undefined) {
            return log.error('没有选择模板类型');
        }

        // 确保目录存在
        fs.ensureDirSync(tmpDirectory);
        var ps = spawn('git', ['clone', 'https://github.com/chenjunxyf/'+ type + '.git'], {
            cwd: tmpDirectory
        });

        ps.on('exit', function(err) {
            if (err) {
                return log.error('脚手架加载出错');
            }

            co(function*() {
                var tplDir = path.join(tmpDirectory, type);
                yield copy(tplDir, currentDir);
                yield remove(currentTmp);
            }).then(function() {
                log.info('脚手架创建成功');
            }, function(err) {
                log.error('脚手架加载出错');
            });
        });

        // 目录拷贝
        function copy(source, target) {
            return new Promise(function(resolve, reject) {
                fs.copy(source, target, function(err) {
                    if(err) return reject(err);
                    resolve(true);
                });
            });
        }
        // 目录删除
        function remove(source) {
            return new Promise(function(resolve, reject) {
                fs.remove(source, function(err) {
                    if(err) return reject(err);                    
                    resolve(true);
                });
            }); 
        }
    }
};















