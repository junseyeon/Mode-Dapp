'use strict'

const UserStorage = require("./UserStorage");
const logger = require("../config/logger");

class User{
    constructor (body){
        this.body = body;   // this.body가 멤버변수.. (선언 안해도 가능)
    }

    async login(){        // function 안 붙임..
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id);
            if(user){
                if(user.user_id===client.id && user.psword === client.pw){
                    return {success:true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다"};
            }
            return {success: false, msg: "존재하지 않는 아이디입니다"};
        } catch(err){
            logger.error(`:: user.js :: ${err} `);
            return {success: false, err};    //key와 value가 같으면 key만 입력가능 
        }
       
    }

    async register(){
        const client = this.body;
        try{
            const result = await UserStorage.save(client);
            if(result) return {success : true};
            else return {success: false, msg: "회원가입 실패입니다"};
        } catch(err){
            return { success: false, err};
        }
    }
}

module.exports = User;