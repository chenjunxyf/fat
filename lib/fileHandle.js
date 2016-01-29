/* 不同类型的请求文件处理 */
const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');
const less = require('less');
const util = require('./util');
const engine = require('./engine');
const log = require('./log')();

var config = util.getLocalConf();
var cwd = process.cwd();
var mockDir = path.join(cwd, 'mock', 'html'); 

// 确保mock目录存在
fs_extra.ensureDirSync(mockDir);

module.exports = {

    /**
     * 文件相关信息
     * @param  {[string]} filePath [文件绝对路径]
     * @return {[function]}
     */
    fileStat: function (filePath) {
        return function(done) {
            fs.stat(filePath, done);
        }
    },

    /**
     * less文件处理
     * @param  {[string]} filePath [文件绝对路径]
     * @return {[function]}     
     */
    handleLess: function(filePath) {
        var content = fs.readFileSync(filePath, 'utf8');

        return function(done) {
            less.render(content.toString(), {
                paths: [path.dirname(filePath)],
                compress: false
            }, done);
        };
    },

    /**
     * 页面模板解析
     * @param  {[string]} filePath [文件相对路径]
     * @return {[function]}
     */
    handleTemplate: function(filePath) {
        var mockPath = path.join(mockDir, filePath.replace('.html', '.json')),
            context;

        fs_extra.ensureFileSync(mockPath);
        context = fs.readFileSync(mockPath, 'utf8');
        context = context === '' ? '{}' : context; // 预防空json

        return function(done) {
            engine.getEngine().render(filePath, JSON.parse(context.toString()), done);
        };
    },

    /**
     * 目录请求路径
     * @param  {[string]} dirPath [目录路径]
     * @return {[json]}        [目录相关信息]
     */
    getDirectoryInfo: function(dirPath) {
        return function(done) {
            fs.readdir(dirPath, done);
        }
    },

    /**
     * dir信息json化 
     * @param  {[string]} filePath [文件相对路径]
     * @param  {[string]} dirInfo [具体文件信息]
     * @return {[json]}           [目录下文件信息]
     */
    dir2Json: function(filePath, dirInfo) {
        var res = {
            root: filePath,
            info: []
        };

        dirInfo.forEach(function(el, index, array) {
            var p = path.join(cwd, filePath, el);
            var stat = fs.statSync(p);

            res.info.push({
                name: el,
                path: path.join(filePath, el), // 请求路径
                type: stat.isFile()  // 类型：文件夹or文件
            });
        });

        return res;
    },

    /**
     * 反向代理
     * @param  {[string]} filePath [文件相对路径]
     * @return {[string]}          [description]
     */
    proxy: function(filePath) {
        var proxy = config.proxy;
        var res = filePath;

        if (proxy && proxy.length > 0) {
            proxy.forEach(function(p) {
                if (p.rule.test(filePath)) {
                    res = filePath.replace(p.rule, p.target);
                    log.info(filePath + " >proxy to> " + res);
                }
            });
        }

        return res;
    }

};
































