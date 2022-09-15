'use strict'

const User = require("../model/User");

const output = {
    index: (req, res)=>{
        res.render('index');    //views/index.ejs
    },
    
    sub1: (req, res) => {
        res.render('sub1');
    },
    
    login: (req,res) => {
        res.render('login');
    },
};

const process = {
    login: (req,res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);   // client 전달
    },
};

 


// module은 key:value 값으로 전달되는데 아래처럼 key만 적을경우 ex)index:index가 됨
module.exports={
    output,
    process,
};