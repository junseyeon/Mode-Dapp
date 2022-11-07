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

    async getStep1(id){       // uid에서 regid로 바꾸기.. 나중에1!!!
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

    async getStep2(regid){
        const result = await MarketStorage.getStep2(regid);
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

    async getStep3(regid){
        const result = await MarketStorage.getStep3(regid);
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

    async insertPage3(){
        const client = this.body;
        const result = await MarketStorage.step3(client);
        return this.tryCatch(result);
    }

    insertPage4(){

    }

    async getMarket(){
        const client = this.body;
        const result = await MarketStorage.getPageInfo(client);
        const result2 = this.tryCatch(result);
        return result2.data;
    }

    tryCatch(result){
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
}

module.exports = Market;