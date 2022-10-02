'use strict'

const User = require("../model/User");
const logger = require("../config/logger");

const output = {
    index: (req, res)=>{
        res.render('index');    //views/index.ejs
    },
    
    market: (req, res) => {
        res.render('market');
    },
    
    login: (req,res) => {
        res.render('login');
    },

    register: (req, res) => {
        res.render('register');
    },
};

const process = {
    login: async(req,res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: 'POST',
            path: '/login',
            status: response.err? 400 : 200 ,
        };
        log(response, url );
        return res.status(url.status).json(response);              // client 전달할 때 상태값을 전달해줘야 함 (따로 사용되는 것이 있음)
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url ={
            method: 'POST',
            path: '/register',
            status: response.err? 400 : 201,
        };
        log(response, url);
        return res.status(url.status).json(response);
    },
};

const log = (response, url) => {
    if(response.err){
        logger.error(`${url.method} / ${url.path} ${url.status} Response: ${response.success} ${response.err}`);
    }
    else{
        logger.info(
            `POST/ login 200 Response: ${response.success} ${response.msg|| ""}`               //response.msg가 없으면 "" 출력
        );
    }
}


// module은 key:value 값으로 전달되는데 아래처럼 key만 적을경우 ex)index:index가 됨
module.exports={
    output,
    process,
};

// 상태코드 ; 올바른 상태코드를 서버에 전달해 주는게 중요함...