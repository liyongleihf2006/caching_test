/**
 * Created by LiYonglei on 2017/2/9.
 * 命令行写 node app/cacheControl/cacheControl-noCache.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的结果是:
 * 所有的浏览器都会向服务器重新发送请求并响应为304；说明当服务器中的静态资源未发生改变时使用缓存
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
        res.setHeader("Cache-Control","public, no-cache");
    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})