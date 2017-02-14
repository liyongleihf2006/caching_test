/**
 * Created by LiYonglei on 2017/2/9.
 * 测试Expires
 * 命令行写 node app/expires/expires-cacheControl60.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的expires时限是当前时间20秒以后
 * 测试Cache-Control的max-age值：
 *     index.html为50秒
 *     index.js index.css index.jpg为60秒
 * 测试的结果是:
 *chrome中:
 *      1、直接地址栏回车刷新
 *      index.html每次刷新页面都会被请求并且返回值是200,说明expires和Cache-Control:max-age的设置在chrome中对于静态页面不起作用
 *      index.css index.jpg index.js 60秒内刷新页面都不会向服务器请求,说明Cache-Control的设置对这些资源是起作用的,并且其优先级高于expires
 *      2、F5刷新
 *      表现的跟直接地址栏回车刷新完全相同
 * firefox中:
 *      1、直接地址栏回车刷新
 *      index.html 50秒内刷新页面都不会向服务器请求,说明Cache-Control的设置对静态页面起作用并且其优先级高于expires
 *      index.css index.jpg index.js 60秒内刷新页面都不会向服务器请求,说明Cache-Control的设置对这些资源是起作用的,并且其优先级高于expires
 *      2、F5刷新
 *      所有的资源每次刷新页面都会被请求并且返回值是200，也就是当F5的时候firefox所有的资源都会重新请求
 * ie edge中:
 *      表现的跟firefox完全相同
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
            if(/html/.test(url)){
                res.setHeader("Cache-Control","public, max-age=50");
            }else{
                res.setHeader("Cache-Control","public, max-age=60");
            }
            /*当设置一个Expires,值是当前时间的20秒后*/
            res.setHeader("Expires",new Date(Date.now()+20*1000).toGMTString());

    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})