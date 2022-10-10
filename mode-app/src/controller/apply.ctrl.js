'use strict'

const logger = require("../config/logger");

const process = {
    pstep1: (req,res)=>{
        res.render('apply/pstep1');    // 경로:: /apply/pstep1   
    },
    pstep2: (req,res)=>{
        res.render('apply/pstep2');    // 경로:: /apply/pstep1   
    },
    pstep3: (req,res)=>{
        res.render('apply/pstep3');    // 경로:: /apply/pstep1   
    },

}

module.exports={
    process,
};