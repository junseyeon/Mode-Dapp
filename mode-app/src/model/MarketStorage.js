'use Strict'

const db = require('../config/db_config');
const logger = require('../config/logger');

class MarketStorage{

    static register(id){
        return new Promise((resolve,reject)=>{
            const query = "insert into apply_main(user_id) values (?);";
            db.query(query,[id],(err, data) =>{
                if(err){
                    logger.error(`${err}`);
                    reject(`${err}`);
                } else{  // 쿼리 성공
                    resolve({success:true});
                }
            })
        })
    }

}

module.exports = MarketStorage;