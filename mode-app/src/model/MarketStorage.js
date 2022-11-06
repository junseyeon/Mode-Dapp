'use Strict'

const db = require('../config/db_config');
const logger = require('../config/logger');
const moment = require("moment");

class MarketStorage{

    static getUsername(id){
        return new Promise((resolve, reject)=>{
            const query = "select name from user where user_id=?;";
            db.query(query, [id], (err,data)=>{
                if(err){
                    logger.error(`${err}`);
                } else{
                    // logger.info("marketStorage:: " + data[0].name + " " + typeof data[0].name);
                    resolve(data[0].name);
                }
            })
        })
    }

    static register(id){
        return new Promise((resolve,reject)=>{
            const query = "insert into apply_main(user_id) values (?);";
            db.query(query,[id],(err, data) =>{
                if(err){
                    logger.error(`${err}`);
                    reject(`${err}`);
                } else{  // 쿼리 성공
                    logger.info("marketStorage, data.insertId: "+ data.insertId);
                    resolve({success:true, regid: data.insertId});
                }
            })
        })
    }

    static getStep1(id){   
        return new Promise((resolve,reject)=>{
            const query = "select s1_q1,s1_q12,s1_q2,s1_q3,s1_q4 from apply_main where user_id=?";
            db.query(query,[id],(err,data)=>{
                if(err){
                    logger.err(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve(data[0]);
                }
            })
        })
    }

    static getStep2(regid){    
        return new Promise((resolve,reject)=>{
            const query = "select pTitle, mainImgPath, category, amount, endDate, searchTag from apply_main where reg_id=?";
            db.query(query,[regid],(err,data)=>{
                if(err){
                    logger.err(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve(data[0]);
                }
            })
        })
    }

    static getPageInfo(uid, pageNum){         // 모든 page가 동일한 관계로 한 함수로 정리하기 [나중에]          
        return new Promise((resolve,reject)=>{
            const query = "select pTitle, mainImgPath, category, amount, endDate, searchTag from apply_main where user_id=?";
            db.query(query,[uid],(err,data)=>{
                if(err){
                    logger.err(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve(data[0]);
                }
            })
        })
    }

    static getStep3(regid){    // 나중에 프로젝트가 여러개면 프로젝트 아이디도 가져오기
        return new Promise((resolve,reject)=>{
            logger.info("getStep3-marketStorage : " + regid);
            const query = "select introImgPath, introVideoPath, introSummary, mainarticle from apply_main where reg_id=?";
            db.query(query,[regid],(err,data)=>{
                if(err){
                    logger.err(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve(data[0]);
                }
            })
        })
    }


    static step1(client){
       return new Promise((resolve, reject)=>{
            const query = "update apply_main set s1_q1=?, s1_q12=?, s1_q2=?, s1_q3=?, s1_q4=? where user_id=? and reg_id=?;";
            db.query(query,[client.q1, client.q12, client.q2, client.q3, client.q4, client.uid, client.regid],(err, data) => {
                if(err){
                    logger.error(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve({success:true, regid: client.regid});
                }
            });
       })
    }

    static step2(client){
     //   console.log(client['0'] + ' ' +client['1'] + ' ' + client['2'] + ' ' + client['3'] );
        return new Promise((resolve, reject)=>{ 
            const query="update apply_main set pTitle=?, mainImgPath=?, category=?, amount=?, endDate=?, searchTag=concat_ws(',',searchTag,?) where user_id=? and reg_id=?;;";
            db.query(query, [client['0'], client['5'],client['1'],client['2'],client['3'], client['4'], client.uid, client.regid],(err,data)=>{
                if(err){
                    logger.error(`${err}`);
                    reject(`${err}`);
                } else{
                    resolve({success:true, regid: client.regid});
                }
            });
        });

    }

    // json으로 갑 가져오는 2가지 방법 , [''] or .'' 
    static step3(client){
        return new Promise((resolve, reject)=>{
                const query = "update apply_main set introImgPath=?, introVideoPath=?, introSummary=?, mainarticle=? where user_id=? and reg_id=?;";
                db.query(query, [client['0'] , client['1'] ,client['2'], client['3'], client.uid, client.regid],(err, data) => {
                    if(err){
                        logger.error(`${err}`);
                        reject(`${err}`);
                    } else{
                        resolve({success:true, regid: client.regid});
                    }
                });
            })
    }

    static step4(client){

    }

 

}

module.exports = MarketStorage;