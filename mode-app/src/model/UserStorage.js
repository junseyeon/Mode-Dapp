"use strict"

class UserStorage{
    //static설명: new UserStorage() 안하고선 바로 객체 user를 불러오려면 class변수가 static이여야 한다. (static으로 변경함)
    static #users = {     //#을쓰면 private임!! class안에선 const 필요없음 
        id: ["11","22"],
        psword : ["11","22"],
        name : ["하하","파파"],
    };

 //new안하고 클래스 자체에서 함수를 접근하려면 static을 붙인다.
    static getUsers(...fields){  // fidelds=배열, 매개변수 몇개가 올지 모름  (#users중에서 넘어온 필드의 값만 돌려주는 것이 목표)
        const users = this.#users;
        const newUsers = fields.reduce((newUser,field) => { 
           if(users.hasOwnProperty(field)){
            newUser[field] = users[field];
           }
           return newUser;
        },{});
        return newUsers;
    };

    static getUserInfo(id){    // 입력한id index에 위치한 pw랑 같이 넘김 
        const users = this.#users;
        const idx = users.id.indexOf(id);    // id가 존재하지 않으면 idx : -1 반환
        const userKeys = Object.keys(users);  // users의 key값 userKeys = [id,pw,name]
        const userInfo = userKeys.reduce(( newUser , info) =>{   // info : id, pw, name순
            newUser[info] = users[info][idx]; 
            return newUser;
        },{});  // newUser {} 빈 객체로 초기화

        return userInfo;
    };

    static save(userInfo){
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.pw);
        console.log(users);
          
    }
}

module.exports = UserStorage;
