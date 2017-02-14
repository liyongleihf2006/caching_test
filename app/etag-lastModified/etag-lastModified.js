/**
 * Created by LiYonglei on 2017/2/9.
 * 测试etag lastModified 的优先级之当last-Modified过期
 * 命令行写 node app/etag-lastModified/etag-lastModified.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 当last-modified过期的时候,last-modified优先级高
 */
var express = require("express");
var app = express();
app.use('/index.html', function(req, res, next) {
    /*修改时间永远是当前时间，这样每次请求last-Modified都过期*/
    res.set('Last-Modified',new Date().toGMTString());
    res.send("<span>hello world</span>");
});
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})