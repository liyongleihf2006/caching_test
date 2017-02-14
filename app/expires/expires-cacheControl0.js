/**
 * Created by LiYonglei on 2017/2/9.
 * 测试Expires
 * 命令行写 node app/expires/expires-cacheControl0.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的expires时限是当前时间20秒以后
 * 测试Cache-Control的max-age值为0秒
 * 测试的结果是:
 * chrome中:
 *      1、直接地址栏回车刷新
 *      index.html每次刷新页面都会被请求并且返回值是200,说明max-age:0的设置在chrome中对于静态页面起作用或者expires和cacheControl都不起作用
 *      index.css index.jpg index.js 每次刷新都向服务器请求说明max-age:0的优先级高于expires
 *      2、F5刷新
 *      表现的跟直接地址栏回车刷新完全相同
 * firefox中:
 *      1、直接地址栏回车刷新
 *      index.html index.css index.jpg index.js 每次刷新都向服务器请求说明max-age:0的优先级高于expires
 *      2、F5刷新
 *      所有的资源每次刷新页面都会被请求并且返回值是200，也就是当F5的时候firefox所有的资源都会重新请求
 * ie edge中:
 *      表现的跟firefox完全相同
 *
 * **也许F5在chrome中的不同表现是浏览器中某些配置的原因,我的chrome的配置是默认设置,我没有细细研究**
 *
 */
var express = require("express");
var app = express();
app.use(express.static("public",{
    /*去掉etage*/
    etag:false,
    /*去掉lastModified*/
    lastModified:false,
    setHeaders:function (res,url) {
            /*max-age为0s*/
            res.setHeader("Cache-Control","public, max-age=0");
            /*当设置一个Expires,值是当前时间的20秒后*/
            res.setHeader("Expires",new Date(Date.now()+20*1000).toGMTString());

    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})