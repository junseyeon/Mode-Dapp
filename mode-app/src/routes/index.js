"use strict"
const express =require('express');
const router = express.Router();

const ctrl = require('../controller/index.ctrl');

router.get('/', ctrl.output.index);
router.get('/market', ctrl.output.market);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);
router.get('/logout',ctrl.process.logout);
router.get('/marketDetail',ctrl.output.marketDetail); 

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

module.exports = router;


/**
    server.js에서 있었던 부분을 그대로 routes index.js로 가지고 옴
    app.get을 router로만 변경

    그 후 server.js에서 받아 오면 됨

    app.METHOD(PATH, HANDLER)
    app : Exrpess 인스턴스
    METHOD : HTTP 요청 메소드
    PATH : 서버 경로
    HANDLER : 라우트가 일치할 때 실행되는 함수
*/