'use strict'
const express = require('express');
const router = express.Router();

const ctrl = require('../controller/apply.ctrl');

router.get('/start',ctrl.output.start);
router.get('/greeting',ctrl.output.greeting);
router.get('/pstep1',ctrl.output.pstep1);
router.get('/pstep2',ctrl.output.pstep2);
router.get('/pstep3',ctrl.output.pstep3);
router.get('/pstep4',ctrl.output.pstep4);

router.post('/start',ctrl.process.start);
router.post('/pstep1',ctrl.process.pstep1);
router.post('/pstep2',ctrl.process.pstep2);
router.post('/pstep3',ctrl.process.pstep3);

router.post('/upload', ctrl.process.upload);   //이미지 or 첨부파일 업로드

module.exports = router;
