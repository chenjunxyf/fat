# fat

一个前端开发工具，用于实现本地前端开发

## 技术

* nodejs >= v5.0.0
* koa、co-views
* commander
* 定制化的fis3：[fis3-wrapper-common](https://github.com/guananddu/fis3-wrapper-common)
* [django模板渲染工具包](https://github.com/yanni4night/django)

## 功能

* 自动拉取开发模板脚手架
* 接入本地构建工具fis3，并且支持扩展
* 自定义测试mock数据，包括同步数据和异步数据
* 本地django模板渲染，并且支持可扩展
* 本地代理，线上请求映射到本地文件

## 安装

**包安装**

```npm install fat-byte -g```

**fis3-wrapper-common安装**

```npm install fis3-wrapper-common -g```

**django后台安装**

```easy_install "Django==1.7"```

## 使用

**查看帮助**

```fat -h```

**创建脚手架**

```fat init bui```

**启动本地服务器并且利用fis3构建，自动打开浏览器**

```fat server```