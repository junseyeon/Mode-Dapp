"use strict"
//모듈
const express = require('express');
const app = express();

const path = require('path')
//public을 해줘야 public안에 있는 css js 등 들이 index.ejs에서 public url없이 사용가능
app.use(express.static(path.join(__dirname, 'public'))); //퍼블릭 웹 아티팩트를 위한 베이스 디렉터리 (그냥 public이랑 같음)
//app.use(express.static('../mode-contract/build/contracts'));

app.set('views', path.join(__dirname, 'views'));  // './views' 랑 동일
app.set('view engine', 'ejs');      //no default engine was specified and no extension was provided.

// 라우팅
/* 
app.get('/',function(req, res){
    res.render('index');
});
app.get('/sub',function(req, res){
    res.render('sub1');
});
*/ // routes의 index.js로 옮기고 아래 두 줄로 받아옴 
const home  = require('./routes')
//앱세팅 
app.use('/', home);      // use: 미들웨어를 등록해주는 메소드


const PORT = 3000;
app.listen(PORT, function(){
    console.log('Example app listenin on port 3000');
})
