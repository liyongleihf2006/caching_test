/**
 * Created by LiYonglei on 2017/2/9.
 * 命令行写 node app/cacheControl/cacheControl-noStore-etag.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的结果是:
 * 所有的浏览器都会向服务器重新发送请求并响应为200;说明及时服务器中的静态资源未发生变化依然不使用缓存中的资源而是从服务器中重新请求
 *
 */
var express = require("express");
var app = express();
app.use(express.static("public",{
    etag:true,
    lastModified:false,
    setHeaders:function (res,url) {
        res.setHeader("Cache-Control","public, no-store");
    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})