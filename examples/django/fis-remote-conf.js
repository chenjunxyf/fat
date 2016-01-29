// 远程发布设置

module.exports = {

    'guanwei': {
        receiver: 'http://10.4.17.164:6776/receiver',
        deploy: {
            // 静态资源
            '*': '/data00/home/guanwei/repos/ss_site/webroot',
            // 模板
            '*.html': '/data00/home/guanwei/repos/ss_site/djangosite/templates'
        }
    },

    'fanwei': {
        receiver: 'http://10.4.17.164:6771/receiver',
        deploy: {
            // 静态资源
            '*': '/data01/home/fanwei/repos/ss_site/webroot',
            // 模板
            '*.html': '/data01/home/fanwei/repos/ss_site/djangosite/templates'
        }
    },

    // 新项目目录
    'xiayi': {
        receiver: 'http://10.4.17.164:9554/receiver',
        deploy: {
            // 静态资源
            '*': '/data00/home/xiayi/repos/site_fe',
            // 模板
            '*.html': '/data00/home/xiayi/repos/site_fe'
        }
    },
    'wangcongwu':{
        receiver: 'http://10.4.17.164:9910/receiver',
        deploy: {
            // 静态资源
            '*': '/data01/home/wangcongwu/repos/ss_site/webroot',
            // 模板
            '*.html': '/data01/home/wangcongwu/repos/ss_site/djangosite/templates'
        }
    },

    'chenjun': {
        receiver: 'http://10.4.17.164:6778/receiver',
        deploy: {
            // 静态资源
            '*': '/data01/home/chenjun/repos/ss_site/webroot',
            // 模板
            '*.html': '/data01/home/chenjun/repos/ss_site/djangosite/templates'
        }
    },

    'zhuyuqi': {
      receiver: 'http://10.4.17.164:62229/receiver',
      deploy: {
          // 静态资源
          '*': '/data02/zhuyuqi/repos/ss_site/webroot',
          // 模板
          '*.html': '/data02/zhuyuqi/repos/ss_site/djangosite/templates'
      }
    }

};