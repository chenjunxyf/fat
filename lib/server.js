/* 启动koa服务 */
var koa = require('koa');
var util = require('./util');
var log = require('./log')();

module.exports = {
    start: function(type) {
        util.getLocalConf();
    }
};