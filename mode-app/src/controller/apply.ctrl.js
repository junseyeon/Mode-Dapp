'use strict'

const Market = require("../model/Market");
const logger = require("../config/logger");

const output = {
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

const process = {
    pstep1: (req,res)=>{
        console.log(req.body);

    },
    pstep2: (req,res) =>{

    },
    pstep3: (req,res) =>{

    },
}

module.exports={
    output,
    process,
};