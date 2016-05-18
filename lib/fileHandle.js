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
var mockDir_html = path.join(cwd, 'mock', 'html'); 
var mockDir_ajax = path.join(cwd, 'mock', 'ajax'); 

// 确保mock目录存在
fs_extra.ensureDirSync(mockDir_html);
fs_extra.ensureDirSync(mockDir_ajax);

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
        var mockPath = path.join(mockDir_html, filePath.replace('.html', '.tpl.js')),
            context;

        fs_extra.ensureFileSync(mockPath);
        context = fs.readFileSync(mockPath, 'utf8');

        if (context === '') {
            fs.writeFileSync(mockPath, 'module.exports = {};', 'utf8');
        }

        delete require.cache[require.resolve(mockPath)];
        context = require(mockPath);

        return function(done) {
            // engine.getEngine().render(filePath, JSON.parse(context.toString()), done);
            engine.getEngine().render(filePath, context, done);
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
     * @return {[string]}          [代理路径文件]
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
    },

    /**
     * ajax模拟
     * @param  {[string]} filePath [ajax请求路径]
     * @return {[string]}          [请求模拟内容]
     */
    handleAjax: function(filePath) {
        var len = filePath.length,
            mockPath,
            context;

        if (filePath[len - 1] === '/') {
            filePath = filePath.slice(0, len - 1);
        }

        mockPath = path.join(mockDir_ajax, filePath + '.json');

        fs_extra.ensureFileSync(mockPath);
        context = fs.readFileSync(mockPath, 'utf8');

        if (context === '') {
            fs.writeFileSync(mockPath, '{}', 'utf8');
        }

        return JSON.parse(context.toString());
    }

};
































