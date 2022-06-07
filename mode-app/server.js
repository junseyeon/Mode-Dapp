var express = require('express');
var app = express();
var path = require('path')

app.use(express.static('public'));  //퍼블릭 웹 아티팩트를 위한 베이스 디렉터리
// app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('../mode-contract/build/contracts'));

app.set('views', path.join(__dirname, 'views'));  // './views' 랑 동일
app.set('view engine', 'ejs');      //no default engine was specified and no extension was provided.

app.get('/',function(req, res){
    console.log("/로 들어옴");
    res.render('index');
});

app.get('/sub',function(req, res){
    console.log(".....?");
    res.render('sub1');
});

app.listen(3000, function(){
    console.log('Example app listenin on port 3000');
})
