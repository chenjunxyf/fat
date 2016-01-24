const fs = require('fs');
const path = require('path');

// dango模板引擎
const djangoEngine = require('django');
const cwd = process.cwd();

// 模板引擎列表
var engines = {
    django: {
        render: function(filePath, context, done) {
            djangoEngine.configure({
                tempalte_dirs: cwd
            });

            djangoEngine.renderFile(cwd + filePath, context, done);
        }
    }
};

module.exports = {
    getEngine: function() {
        return engines['django'];
    }
}