'use strict'

const Market = require("../model/Market");
const logger = require("../config/logger");

const output = {
    start: (req,res)=>{
        var userInfo= [
            {'id': req.session.uid},
        ];

        var data = {
            id : req.session.uid,
        }
        //res.render('apply/start',{'data':userInfo});
        res.render('apply/start',{'data':data});
    },
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
    start : async(req,res) =>{
       logger.info(req.body.id);   //지금은 client에서 id를 가져왔지만.. 예시로 참고.. 원래 req로 session값 가져오면 됨

       const regMarket = new Market(req.body);
       const response = await regMarket.start();
       
       if(response.success){
            res.json({success:true});
       } else{
            res.json({success:false});
       }
    },
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