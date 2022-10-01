'use strict'

const User = require("../model/User");

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
        return res.json(response);              // client 전달
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
};

 


// module은 key:value 값으로 전달되는데 아래처럼 key만 적을경우 ex)index:index가 됨
module.exports={
    output,
    process,
};