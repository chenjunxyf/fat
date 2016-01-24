/* 不同类型的请求文件处理 */
const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');
const less = require('less');
const engine = require('./engine');
const log = require('./log')();

const cwd = process.cwd();
const mockDir = path.join(cwd, 'mock', 'html');

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
    }

};
































