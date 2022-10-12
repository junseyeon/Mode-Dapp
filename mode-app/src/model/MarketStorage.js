'use Strict'

const db = require('../config/db_config');
const logger = require('../config/logger');

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

    }

    static step3(client){

    }

    static step4(client){

    }

 

}

module.exports = MarketStorage;