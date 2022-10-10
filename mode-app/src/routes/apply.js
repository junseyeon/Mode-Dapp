'use strict'
const express = require('express');
const router = express.Router();

const ctrl = require('../controller/apply.ctrl');

router.get('/pstep1',ctrl.process.pstep1);
router.get('/pstep2',ctrl.process.pstep2);
router.get('/pstep3',ctrl.process.pstep3);

module.exports = router;
