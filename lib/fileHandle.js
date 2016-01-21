/* 不同类型的请求文件处理 */
const fs = require('fs');
const less = require('less');
const log = require('./log')();

module.exports = {
    /**
     * 文件相关信息
     * @param  {[string]} path [文件路径]
     * @return {[function]}
     */
    fileStat: function (path) {
        return function(done) {
            fs.stat(path, done);
        }
    },

    /**
     * less文件处理
     * @param  {[string]} path [文件路径]
     * @return {[function]}     
     */
    handleLess: function(path) {
        var content = fs.readFileSync(path);

        return function(done) {
            less.render(content.toString(), done);
        };
    }
};
































