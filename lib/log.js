/* 日志格式化打印 */
const colors = require('colors');
const moment = require('moment');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

/**
 * [log格式化简单封装]
 * @return {[Object]} [log常用方法]
 */
function log() {

    /**
     * [log格式化]
     * @param  {[int]} type [log类型]
     * @param  {[string]} msg  [log信息]
     */
    function formatLog(type, msg) {
        var currentTime = '[' + moment().format('YYYY-MM-DD HH:mm:ss') + '] ';

        switch(type) {
            case 0:
                console.log(currentTime.data + msg);
                break;
            case 1:
                console.log(currentTime.data + msg.info);
                break;
            case 2:
                console.log(currentTime.data + msg.warn);
                break;
            case 3:
                console.log(currentTime.data + msg.error);
                break;
        }
    }

    return {
        log: function(msg) { formatLog(0, msg); },
        info: function(msg) { formatLog(1, msg); },
        warn: function(msg) { formatLog(2, msg); },
        error: function(msg) { formatLog(3, msg); }
    };
}

module.exports = log;