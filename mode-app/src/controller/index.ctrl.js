'uset strict'

const index = (req, res)=>{
    res.render('index');    //views/index.ejs
}

const sub1 = (req, res) => {
    res.render('sub1');
}

// module은 key:value 값으로 전달되는데 아래처럼 key만 적을경우 ex)index:index가 됨
module.exports={
    index,
    sub1,
};