"use strict"

const db = require('../config/db_config.js');
const logger = require("../config/logger");

class UserStorage{
    //static설명: new UserStorage() 안하고선 바로 객체 user를 불러오려면 class변수가 static이여야 한다. (static으로 변경함)

    //new안하고 클래스 자체에서 함수를 접근하려면 static을 붙인다.
   // static getUsers(...fields){ } // fidelds=배열, 매개변수 몇개가 올지 모를때 ...으로 전체를 불러옴  (#users중에서 넘어온 필드의 값만 돌려주는 것이 목표)
        
    static getUserInfo(id){    // 입력한id index에 위치한 pw랑 같이 넘김 
        return new Promise((resolve, reject)=> {
            const query = "SELECT id, psword FROM user WHERE id = ?;";
            db.query(query,[id],(err,data) => {
                if(err) {
                    reject(`${err}`);
                }
                else {
                    if(data[0]===undefined) reject(`존재하지 않는 계정입니다.`);
                    resolve(data[0]);     //** reslove, reject가 같이쓰면 resolve가 반환 됨..
                }
           });  
        });
    }

    static save(userInfo){
        return new Promise((resolve, reject)=> {
            const query = "insert into user(id,name, psword,role) values(?,?,?,?);";
            db.query(query,[userInfo.id,userInfo.name, userInfo.pw, userInfo.role],(err,data) => {
                if(err) reject(`${err}`);
                else resolve({success:true});
           });  
        });
    }
}

module.exports = UserStorage;
