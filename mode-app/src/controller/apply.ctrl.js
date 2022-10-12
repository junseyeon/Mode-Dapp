'use strict'

const Market = require("../model/Market");
const logger = require("../config/logger");

const output = {
    start: async(req,res)=>{
        const start = new Market();
        const name = await start.getName(req.session.uid);

        const data = {
            name : name,
        }
        res.render('apply/start',{'data':data});
    },
    pstep1: async(req,res)=>{

        if(req.query.regid === undefined){
            //alert('잘못된 접근입니다');
            //process.exit(1);
        }
        
        const step1 = new Market();
        const name = await step1.getName(req.session.uid);

        const data = {
            regid : req.query.regid, 
            name : name,
        }
        res.render('apply/pstep1',{'data':data});    // 경로:: /apply/pstep1   
    },
    pstep2: async (req,res)=>{
        const step1 = new Market();
        const name = await step1.getName(req.session.uid);

        const data = {
            regid : req.query.regid, 
            name : name,
        }
        res.render('apply/pstep2',{'data':data});    // 경로:: /apply/pstep1   
    },
    pstep3: (req,res)=>{
        res.render('apply/pstep3');    // 경로:: /apply/pstep1   
    },
}

const process = {
    start : async(req,res) =>{
       const regMarket = new Market(req.session.uid);
       const response = await regMarket.start();
       
       if(response.success){
            res.json(response);
       } else{
            res.json({success:false});
       }
    },
    pstep1: async(req,res)=>{

        //userid값을 전달 받은 json값 추가하기 
        req.body.uid = req.session.uid;
        const step1 = new Market(req.body);
        const response = await step1.insertPage1();

        if(response.success){
            res.json(response);
       } else{
            res.json({success:false});
       }

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