/**
 * Created by LiYonglei on 2017/2/9.
 * 命令行写 node app/dynamic/dynamic-ajax.js
 * 浏览器中打开的地址是localhost:3000/ajax.html
 */
var express = require("express");
var app = express();
app.use(express.static("public"));
app.get("/getData",function(req,res){
    res.send({ some: 'json'});
})
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("example app listening at http://%s:%s",host,port);
})