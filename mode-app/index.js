var express = require('express');
var app = express();
app.use(express.static('src'));  //퍼블릭 웹 아티팩트를 위한 베이스 디렉터리
//app.use(express.static('../mode-contract/build/contracts'));
app.get('/',function(req, res){
    res.render('index.html');
});

app.listen(3000, function(){
    console.log('Example app listenin on port 3000');
})
