'use strict'

const User = require("../model/User");
const Market = require("../model/Market");
const logger = require("../config/logger");

const output = {
  
    market: (req, res) => {
        res.render('home/market');   //render할때 데이터도 넘길 수 있음
    },

    marketDetail: async(req, res) => { 
        var regid;   
        regid =  req.body.regid;   // post방식 
        regid = req.query.regid;   //get방식
        //post로 보낸 regid 받음 - 등록 글 번호 
        // const {   // req.body.regid 
        //     body: {regid, } ,       // 여러개 받기 가능
        // } = req;
        logger.info("regid: " +regid);
        const market = new Market(regid);
        const info = await market.getMarketDetail();
        logger.info(JSON.stringify(info));
        res.render('marketDetail', {'data': info});
    },
};

const process = {

};

// module은 key:value 값으로 전달되는데 아래처럼 key만 적을경우 ex)index:index가 됨
module.exports={
    output,
    process,
};

// 상태코드 ; 올바른 상태코드를 서버에 전달해 주는게 중요