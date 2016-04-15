// 远程发布设置

module.exports = {

    'username': {
        receiver: 'http://ip:port/receiver',
        deploy: {
            // 静态资源
            '*': '/dataxx/home/username/repos/ss_site/webroot',
            // 模板
            '*.html': '/dataxx/home/username/repos/ss_site/djangosite/templates'
        }
    }

};