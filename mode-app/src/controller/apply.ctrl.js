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
        name = await start.getName(req.session.uid);

        const data = {
            name,
        }
        res.render('apply/start',{'data': data});
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

        //const regid = req.query.regid;
        //const step1 = new Market();
        //const name = await step1.getName(req.session.uid);

        if(req.query.regid === undefined){
            //alert('잘못된 접근입니다');
            //process.exit(1);
        }
        const data = {
            regid,
            name,
        }

        logger.info("regid: " + regid + " name: " + name);
        res.render('apply/pstep1',{'data':data});    // 경로:: /apply/pstep1   

    },
    pstep2: async (req,res)=>{
       // const step2 = new Market();
       // name = await step2.getName(req.session.uid);
       // regid = req.query.regid;

        // if(req.query.regid === undefined){
        //     return;
        // }

        const data = {
            regid, 
            name,
        }

        logger.info("regid: " + regid + " name: " + name);
        res.render('apply/pstep2',{'data':data});    // 경로:: /apply/pstep1   
    },
    pstep3: async(req,res)=>{
     
       // const step3 = new Market();
       // const name = await step3.getName(req.session.uid);

        const data = {
            regid ,
            name,
        }
        res.render('apply/pstep3',{'data':data});    // 경로:: /apply/pstep1   
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

    upload: (req,res)=>{
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files)=>{    //text data는 fields, file data는 files로 
            var oldpath = files.regImg.filepath;
            var newpath = './files/'+files.regImg.originalFilename;
            fs.rename(oldpath,newpath,function(err){
                if(err) throw err;
                else {
                    logger.info("newpath: " + newpath);
                    const data = {
                        regid, 
                        name,
                        imgPath : '/files/'+files.regImg.originalFilename,
                    }
                    console.log(data.imgPath);
                    res.render('apply/pstep2',{'data': data});
                }
            });
        });
    },
}

module.exports={
    output,
    process,
};