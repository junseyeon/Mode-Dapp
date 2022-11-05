'use strict'

const formidable = require('formidable');
const Market = require("../model/Market");
const logger = require("../config/logger");
const fs  = require('fs');

var name = null;    //전역변수?
var regid = null; 

const output = {
    start: async(req,res)=>{
        const start = new Market();

        if(req.session.uid == undefined){
            res.json("허용되지 않은 접근입니다. 로그인해주세요");
            process.exit(1);
        }
        else{
            name = await start.getName(req.session.uid);
            const data = {
                name,
            }
            res.render('apply/start',{'data': data});
        }
        
    },

    greeting: async(req, res) => {
        //const greeting = new Market();
        // const name = await greeting.getName(req.session.uid);
        regid = req.query.regid;

        const data = {
            regid, 
            name,
        }

        res.render('apply/greeting',{'data':data});
    },

    pstep1: async(req,res)=>{

        const regid = req.query.regid;
        const step1 = new Market();
        const name = await step1.getName(req.session.uid);
        let memory = await step1.getStep1(req.session.uid);

        if(memory.success == false){
            memory = "";
        }

        const data = {
            regid,
            name,
            memory,       //객체
        }

        logger.info("regid: " + regid + " name: " + name + " memory: " + JSON.stringify(memory) );
        res.render('apply/pstep1',{'data':data});    // 경로:: /apply/pstep1   

    },
    pstep2: async (req,res)=>{
        regid = req.query.regid;
        const step2 = new Market();
        name = await step2.getName(req.session.uid);
        let memory = await step2.getStep2(req.session.uid);

        if(memory.success == false){
            memory = "";
        }
        const data = {
            regid, 
            name,
            memory,
        }

        logger.info("output2 regid: " + regid + " name: " + name + " memory: " + JSON.stringify(memory) );
        res.render('apply/pstep2',{'data':data});    // 경로:: /apply/pstep1   
    },
    pstep3: async(req,res)=>{
     
        regid = req.query.regid;
        const step3 = new Market();
        name = await step3.getName(req.session.uid);
        let memory = await step3.getStep3(req.session.uid);

        if(memory.success == false){
            memory = "";
        }

        const data = {
            regid ,
            name,
            memory,
        }
        logger.info("output3 regid: " + regid + " name: " + name + " memory: " + JSON.stringify(memory) );
        res.render('apply/pstep3',{'data':data});     
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
    pstep2: async (req,res) =>{
        req.body.uid = req.session.uid;
        req.body.regid = regid;
        logger.info("pstep2 regid: " + regid);
  
        console.log("apply2 ctrl:" + JSON.stringify(req.body));
        const postStep2 = new Market(req.body);
        const response =  await postStep2.insertPage2();
       
        if(response.success){
            res.json(response);
       } else{
            res.json({success:false});
       }

    },

    pstep3: async (req,res) =>{
        req.body.uid = req.session.uid;
        req.body.regid = regid;
        logger.info("pstep3 regid: " + regid);
  
        console.log("apply3 ctrl:" + JSON.stringify(req.body));
        const step3 = new Market(req.body);
        const response =  await step3.insertPage3();
       
        if(response.success){
            res.json(response);
       } else{
            res.json({success:false});
       }

    },

    upload: (req,res)=>{
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files)=>{    //text data는 fields, file data는 files로 

            var oldpath = files.regImg.filepath;
            var newpath = './files/'+files.regImg.originalFilename;
            logger.info(oldpath + " , " + newpath);
            fs.rename(oldpath,newpath,function(err){
                if(err) throw err;
                else {
                 var data = {
                    success : true,
                    src : '/files/'+files.regImg.originalFilename,
                 }
                 logger.info("upload ctrl: " + data.src);
                 res.json(data);         //-- ajax로 보낼 때
                }
            });
        });
    },
}

module.exports={
    output,
    process,
};