const mysql = require('mysql');
const db = {};
// const BaseRow = db.Row;
// const BaseTable = db.Table;

const pool = mysql.createPool({
    host     : "106.54.89.76",
    user     : "root",
    password :  "123456",
    database :  "user",
    port     :   3306
})
let i =0
let exec =(sql,params,callback) => {

    
    pool.getConnection((err,con) => {
        if(err){
            console.log(err)
            console.info('连接错误，2秒重试');
            console.log('error when connecting to db:', err);
            callback(err,null,null)
        }else{
            console.log("连接",i++)
            if(params === null || params.length === 0){
                con.query(sql,(err,result,fields)=>{
                    callback(err,result,fields)  
                })
            }else{
                con.query(sql,params,(err,result,fields)=>{
                    callback(err,result,fields)
                }) 
            }
        }
        pool.releaseConnection(con);  
    })
}
db.exec = exec
module.exports = db