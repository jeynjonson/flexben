const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flexben",
});

let employee = {
    
    addReimbursementItemDetails: (reimbursementItemDetails, resolve)=>{

        let sql = `INSERT INTO flex_reimbursement_details SET ?`
        db.query(sql, reimbursementItemDetails, (err, data1)=>{
            console.log("aww")
            console.log(data1)
            if(err){
                //reject(err)
            }resolve(data1)
            console.log(data1)
        })
    },

    getReimbursementByEmployeeId: (id, resolve)=>{

        let sql = `SELECT * FROM flex_reimbursement
        WHERE employee_id = ?`;

        db.query(sql,id, (err,data)=>{
            console.log("reimburseEmployeeId")
            console.log(data)
            resolve(data)
        })
    },
    updateTotalReimbursementAmount: (totalAmount, id, resolve)=>{

        let sql = `UPDATE flex_reimbursement
        SET  total_reimbursement_amount = ?
        WHERE employee_id = ?`;

        db.query(sql, [totalAmount, id], (err, data)=>{
            console.log()
            console.log(data)
            resolve(data)
        })

    },

    addFlexReimbursement:(newReimbursementDetails,resolve)=>{
        let sql = `INSERT INTO flex_reimbursement SET ?`
        db.query(sql, newReimbursementDetails, (err, data1)=>{
            console.log("aww")
            console.log(data1)
            if(err){
                //reject(err)
            }resolve(data1)
            console.log(data1)
        })
    }

    //dReimbursement
}

module.exports = employee