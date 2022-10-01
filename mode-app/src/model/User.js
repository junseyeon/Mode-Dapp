'use strict'

const UserStorage = require("./UserStorage");

class User{
    constructor (body){
        this.body = body;   // this.body가 멤버변수.. (선언 안해도 가능)
    }

    async login(){        // function 안 붙임..
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id);
            if(user.id){
                if(user.id===client.id && user.psword === client.pw){
                    return {success:true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다"};
            }
            return {success: false, msg: "존재하지 않는 아이디입니다"};
        } catch(err){
            return {success: false, msg: err};
        }
       
    }

    async register(){
        const client = this.body;
        console.log(this.body);
        const result = UserStorage.save(client);
        if(result) return {success : true};
        else return {success: false, msg: "회원가입 실패입니다"};
    }
}

module.exports = User;