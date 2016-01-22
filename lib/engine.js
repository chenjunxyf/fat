const fs = require('fs');
const path = require('path');

// dango模板引擎
const djangoEngine = require('django');
const cwd = process.cwd();

// 模板引擎列表
var engines = {
    django: {
        render: function(content, context, done) {
            djangoEngine.configure({
                tempalte_dirs: cwd
            });

            // 会导致找不到文件
            // djangoEngine.render(content, context, done);
            djangoEngine.renderFile(content, context, done);
        }
    }
}

module.exports = {
    getEngine: function() {
        return engines['django'];
    }
}