"use strict"
//모듈 (전체적인 모듈 설치 추가하고 use로 미들웨어를 추가시킴)
const express = require('express');
const bodyParaser = require('body-parser');
const app = express();  

const path = require('path');
app.set('views', path.join(__dirname, 'src', 'views'));  // './views' 랑 동일
app.set('view engine', 'ejs');      //no default engine was specified and no extension was provided.

//__dirname 현재 위치 반환  $(__dirname)
//public을 해줘야 public안에 있는 css js 들이 index.ejs에서 public url없이 사용가능
app.use(express.static(path.join(__dirname, 'src','public'))); //퍼블릭 웹 아티팩트를 위한 베이스 디렉터리 (그냥 public이랑 같음)
app.use(bodyParaser.json());
app.use(bodyParaser.urlencoded({extended: true}));  //url을 통해 전달되는 데이터에 한글 공백 문자가 포함될 경우 제대로 인식되지 않는 문제해결


// 라우팅은 routes/index.js에
const home  = require('./src/routes/index');

//앱세팅 
app.use('/', home);   // use: 미들웨어를 등록해주는 메소드
//app.use(express.static('../mode-contract/build/contracts'));


const PORT = 3000;
app.listen(PORT, () => {
    console.log('Example app listenin on port 3000');
});

