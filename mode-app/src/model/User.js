'use strict'

const UserStorage = require("./UserStorage");

class User{
    constructor (body){
        this.body = body;   // this.body가 멤버변수.. (선언 안해도 가능)
    }

    login(){
        const body = this.body;
        const {id, psword } = UserStorage.getUserInfo(body.id);
        console.log(psword);
        if(id){
            if(id===body.id && psword === body.pw){
                return {success:true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다"};
        }
        return {success: false, msg:"존재하지 않는 아이디입니다"};
    }
}

module.exports = User;