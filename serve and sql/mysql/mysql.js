const mysql = require('mysql');
const db = {};
// const BaseRow = db.Row;
// const BaseTable = db.Table;

const pool = mysql.createPool({
    host     : "localhost",
    user     : "root",
    password :  "",
    database :  "user",
})
let exec =(sql,params,callback) => {
    pool.getConnection((err,con) => {
        if(err){
            callback(err,null,null)
        }else{
            if(params === null || params.length === 0){
                con.query(sql,(err,result,fields)=>{
                    con.release();
                    callback(err,result,fields)
                })
            }else{
                con.query(sql,params,(err,result,fields)=>{
                    con.release();
                    callback(err,result,fields)
                }) 
            }
        }
    })
}
db.exec = exec
module.exports = db