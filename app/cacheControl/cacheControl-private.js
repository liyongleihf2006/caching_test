/**
 * Created by LiYonglei on 2017/2/9.
 * 命令行写 node app/cacheControl/cacheControl-private.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的cacheControl时限是:
 *      1、html页面是当前时间10秒以后
 *      2、其他资源是当前时间20秒以后
 * 测试的结果是:
 * chrome中:
 *      1、直接地址栏回车刷新
 *      index.html index.css index.jpg index.js 每次刷新页面都会被请求并且返回值是200
 *      2、F5刷新
 *      表现的跟直接地址栏回车刷新完全相同
 * firefox中:
 *      1、直接地址栏回车刷新
 *      index.html index.css index.jpg index.js 每次刷新页面都会被请求并且返回值是200
 *      2、F5刷新
 *      表现的跟直接地址栏回车刷新完全相同
 * ie edge中:
 *      1、直接地址栏回车刷新
 *      缓存永不过期；后面刷新页面都不会向服务器请求
 *      2、F5刷新
 *      重新向服务器请求响应
 *
 */
var express = require("express");
var app = express();
app.use(express.static("public",{
    /*去掉etag*/
    etag:false,
    /*去掉lastModified*/
    lastModified:false,
    setHeaders:function (res,url) {
        res.setHeader("Cache-Control","private");
    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})