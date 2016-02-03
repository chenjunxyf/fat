const fs = require('fs');
const path = require('path');
const util = require('./util');

// dango模板引擎
const djangoEngine = require('django');
const cwd = process.cwd();

var config = util.getLocalConf();
var build = config.build;
build = build.on ? 'build' : '';

// 模板引擎列表
var engines = {
    django: {
        render: function(filePath, context, done) {
            djangoEngine.configure({
                template_dirs: cwd
            });

            djangoEngine.renderFile(path.join(cwd, build, filePath), context, done);
        }
    }
};

module.exports = {
    getEngine: function() {
        return engines['django'];
    }
}