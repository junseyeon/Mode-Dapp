'use strict'

const MarketStorage = require('./MarketStorage');
const logger = require('../config/logger');

class Market{

    constructor(body){
        this.body = body;
    }

    async getName(id){
        const name = await MarketStorage.getUsername(id);   // MarketStorage new안하고 바로 함수사용 (getUsername이 static이라서 가능)
        try{
            if(name){
                return name;
            } else{
                logger.error('로그인을 다시 확인하세요');
                return "no name";
            }
        } catch(err){
            logger.error(`${err}`);
        }
    }

    async start(){
        const id = this.body;
        const result = await MarketStorage.register(id);

        try{
            if(result.success) {
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

    async getStep1(id){
        const result = await MarketStorage.getStep1(id);
        try{
            if(result){
                return result;
            } else{
                return {success: false, msg: "생성된 프로젝트가 없습니다."};
            }
        } catch(err){
            return {success:false, err}
        }
    }

    async getStep2(id){
        const result = await MarketStorage.getStep2(id);
        try{
            if(result){
                return result;
            } else{
                return {success: false, msg: "생성된 프로젝트가 없습니다."};
            }
        } catch(err){
            return {success:false, err}
        }
    }

    async insertPage1(){
        const client = this.body;
        const result = await MarketStorage.step1(client);
       // regid = result.regid;

        try{
            if(result.success){
                return result;
            } else{
                return { success: false, msg: "데이터 저장 실패"};
            }

        } catch(err){
            return{success: false, err}; 
        }

    }

    async insertPage2(){
        const client = this.body;
        const result = await MarketStorage.step2(client);

        try{
            if(result.success){
                return result;
            } else{
                return { success: false, msg: "데이터 저장 실패"};
            }

        } catch(err){
            return{success: false, err}; 
        }
    }

    insertPage3(){

    }

    insertPage4(){

    }
}

module.exports = Market;