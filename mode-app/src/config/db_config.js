const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
});

// host: "mode.ccyybaccjurm.ap-northeast-2.rds.amazonaws.com",
    // user: "admin",
    // password: "12341234",
    // database :"mode"

db.connect();


module.exports = db;