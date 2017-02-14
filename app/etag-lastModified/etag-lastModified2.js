/**
 * Created by LiYonglei on 2017/2/9.
 * 测试etag lastModified 的优先级之当etag变化
 * 命令行写 node app/etag-lastModified/etag-lastModified2.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 当etag变化时etag的优先级高
 */
var express = require("express");
var app = express();
app.use('/index.html', function(req, res, next) {
    /*固定的过期时间，永远不过期*/
    res.set('Last-Modified',"Tue, 14 Feb 2016 08:16:10 GMT");
    /*每次请求返回的内容不同则etag就每次都不同*/
    res.send("<span>hello"+Math.random()+"world</span>");
});
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})