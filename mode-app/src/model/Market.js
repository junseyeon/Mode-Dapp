'use strict'

const MarketStorage = require('./MarketStorage');
const logger = require('../config/logger');

class Market{

    constructor(body){
        this.body = body;
    }

    async start(){
        // db추가
        const client = this.body;
        const result = await MarketStorage.register(client.id);

        try{
            if(result) {
                logger.info("result:" + result.success);  //객체 접근 2)result[success];
                return result;
            } 
            else{
                return {success: false, msg: '프로젝트 생성 실패입니다.'};
            } 
        }catch(err){
            return{ success: false, err};
        }

    }

    insertPage1(){

    }

    insertPage2(){

    }

    insertPage3(){

    }

    insertPage4(){

    }
}

module.exports = Market;