const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flexben",
});

let employee = {
    
    addReimbursementItem: (reimbursementItem, resolve, reject)=>{

        let sql = `INSERT INTO flex_reimbursement_details SET ?`
        db.query(sql, reimbursementItem, (err, data)=>{
            console.log(data)
            if(err){
                reject(err)
            }resolve(data)
        })

    } 
}

module.exports = employee