"use strict"
const express =require('express')
const router = express.Router();

router.get('/',function(req, res){
    console.log("/로 들어옴");
    res.render('index');
});

router.get('/sub',function(req, res){
    console.log(".....?");
    res.render('sub1');
});

module.exports = router;

/* 
    server.js에서 있었던 부분을 그대로 routes index.js로 가지고 옴
    app.get을 router로만 변경

    그 후 server.js에서 받아 오면 됨
*/