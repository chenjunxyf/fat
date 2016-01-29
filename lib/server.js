/* 启动koa服务 */
const koa = require('koa');
const fs = require('fs');
const path = require('path');
const views = require('co-views');
const util = require('./util');
const log = require('./log')();
const fileHandle = require('./fileHandle');

var app = koa();
var cwd = process.cwd();
var config = util.getLocalConf();
var ejsRender = views(path.join(path.dirname(__dirname), 'views'), {
    map: { html: 'ejs' }
});

var build = config.build;
build = build.on ? 'build' : '';

// 请求路径log
app.use(function *(next) {
    log.info(this.path);
    yield *next;
});

// 静态资源第一层拦截
app.use(function *(next) {
    // 非静态资源
    if (!this.path.match(/^\/static\//)) {
        yield *next;
        return;
    }

    var abPath = path.join(cwd, build, this.path);

    if (!fs.existsSync(abPath)) {
        this.status = 404;
        return log.error(this.path + ' 不存在');
    }

    var fstat = yield fileHandle.fileStat(abPath);

    if (fstat.isFile()) {
        var type = path.extname(abPath);
        this.type = type === '.less' ? '.css' : type;

        if (type !== '.less') { 
            this.body = fs.createReadStream(abPath);
            return;
        }

        // 自动编译less文件
        var less = yield fileHandle.handleLess(abPath);
        this.body = less.css;
    } else {
        return log.error(this.path + ' 文件有问题');
    }
});

// ajax第二层拦截
app.use(function *(next) {
    // ajax 
    if (this.header['x-requested-with'] !== 'XMLHttpRequest') {
        yield *next;
        return;
    }

    console.log('ajax');
});

// 页面模板第三层拦截
app.use(function *(next) {
    // 反向代理处理
    var p = fileHandle.proxy(this.path);
    var abPath = path.join(cwd, build, p);
    
    if (!fs.existsSync(abPath)) {
        this.status = 404;
        return log.error(p + ' 不存在');
    }

    var fstat = yield fileHandle.fileStat(abPath);

    if (fstat.isFile()) { // 模板文件
        this.type = 'html';
        this.body = yield fileHandle.handleTemplate(p);
    } else if (fstat.isDirectory()) { // 目录
        yield *next;
    } else {
        return log.error(p + ' 模板文件有问题');
    }
});

// 模板目录
app.use(function *(next) {
    // 默认进入page目录
    if (this.path === '/') {
        this.path = '/page';
    }
    var dirInfo = yield fileHandle.getDirectoryInfo(path.join(cwd, this.path));
    var res = fileHandle.dir2Json(this.path, dirInfo);
    this.body = yield ejsRender('directory.ejs', res);
});

module.exports = {
     start: function(){
        log.info('fat server is listening on http://localhost:' + config.port);
        app.listen(config.port);
    }
};
























