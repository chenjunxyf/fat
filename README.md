# fat

一个前端开发工具，用于实现本地前端开发

## 技术

* nodejs >= v5.0.0
* koa、co-views
* commander
* 定制化的fis3：[fis3-wrapper-common](https://github.com/guananddu/fis3-wrapper-common)
* django模板渲染包：[django模板渲染工具包](https://github.com/yanni4night/django)
* riot工具包：[riot框架](https://github.com/riot/riot)

## 功能

* 自动拉取开发模板脚手架
* 接入本地构建工具fis3，并且支持扩展
* 自定义测试mock数据，包括同步数据和异步数据
* 本地django模板渲染，并且支持可扩展
* 本地代理，线上请求映射到本地文件

## 安装

**fat包安装**

```npm install fat-byte -g```

**fis3-wrapper-common安装**

```npm install fis3-wrapper-common -g```

**django后台安装**

```easy_install "Django==1.7"```

**启用riot编程模式，需要安装riot**

```npm install riot -g```


## 使用

**查看帮助**

```fat -h```

**创建脚手架**

```fat init bui```

**启动本地服务器并且利用fis3构建，自动打开浏览器**

```fat server```

**构建工具输出格式快速查看**

```fat build local -d ./build```(本地模式)

```fat build online -d ./build```(线上模式)


## 配置文件`fat-config.js`说明

```javascript
moudle.exports = {
    port: 8001,       // 本地服务端口
    build: {
        on: true,     // 是否需要构建
        tool: 'fis3b' // 工具类型，默认：fis3
    },
    proxy: [
        {
            name: '推荐页',
            rule: /\/ttdiscuss\/v1\/brow\/feed\//,  // 线上请求路径
            target: '/page/index/recommend.html'    // 本地模板路径
        }
    ],
    workers: [   // 自启监听子进程
        {
            on: true,  // 是否开启
            command: 'riot',   // 命令
            args: ['-w', 'tags', 'tags']  // 参数
        }
    ]
}

```

## changeLog

### 2016-4-15

* 构建输出格式（线上+线下）
* 启动浏览器的时机
* 控制查看构建工具的输出，以便排错

### 2016-5-8

* js、css静态资源可不一定走static目录
* 添加自动启动配置的监听子进程
* 添加riot编程模式example
* 修改mock数据文件为.tpl.js文件，更方便操作

### 2016-5-18

* 修复mock数据缓存







