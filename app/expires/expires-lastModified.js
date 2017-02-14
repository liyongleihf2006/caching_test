/**
 * Created by LiYonglei on 2017/2/9.
 * 测试Expires
 * 命令行写 node app/expires/expires-lastModified.js
 * 浏览器中打开的地址是localhost:3000/index.html
 * 测试的expires时限是当前时间20秒以后
 * 测试的结果是:
 * 好吧！都报错了 Can't remove headers after they are sent!!!
 * 但是在chrome中是每次都从第三次每次都报错而firefox ie中是20秒后才报错；
 * 这说明chrome的静态页面每次都会向服务器请求,而firefox ie的静态页面是20秒后请求,
 * 由此可以推断出来Expires优先级高于lastModified
 *
 */
var express = require("express");
var app = express();
app.use(express.static("public",{
    etag:false,
    lastModified:true,
    setHeaders:function (res,url) {
        /*去掉Cache-Control,这里写的很烂,我node不好,不太知道如何比较优雅的去掉Cache-Control,
        * 测试了半天发现直接写删除不行，只能使用tick了。。。
        * */
        process.nextTick(function() {
            res.removeHeader("Cache-Control");
        });
        res.setHeader("Expires",new Date(Date.now()+20*1000).toGMTString());
    }
}));
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})