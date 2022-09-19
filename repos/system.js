const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flexben",
});

const systemEmployee={

    findAllEmployee: (resolve, reject)=>{
        let sql =  `SELECT employees.firstname, employees.lastname, roles.description AS role FROM accounts 
        INNER JOIN employees ON accounts.employee_id = employees.employee_id
        INNER JOIN roles ON employees.role_id = roles.role_id
        WHERE accounts.is_active = '1'`;
        console.log(sql);
        db.query(sql, (err,data)=>{
            if(err){
                //reject(err);
            }
            resolve(data);
            
        })

    },

    findEmployeeById: (id, resolve, reject)=>{
        let sql = `SELECT employees.firstname, employees.lastname, employees.employee_id, accounts.is_active as active FROM accounts 
        INNER JOIN employees ON accounts.employee_id = employees.employee_id
        INNER JOIN roles ON employees.role_id = roles.role_id
        WHERE employees.employee_id = ?`;
        
        
        db.query(sql, id, (err, data)=>{
            console.log(sql)
            if(err){
                //reject(err);
            }
            resolve(data);
        });
    },

    loginEmployee: (employee, resolve, reject)=>{
        let sql = `UPDATE accounts 
        INNER JOIN employees ON accounts.employee_id = employees.employee_id
        SET accounts.is_active = '1'
        WHERE employees.email = ? AND accounts.password = ?`;
        
        db.query(sql, [employee.email, employee.password], (err, data)=>{
            console.log(sql)

            let sql2 = `SELECT employees.firstname, employees.lastname, employees.employee_id, roles.description AS role FROM accounts 
            INNER JOIN employees ON accounts.employee_id = employees.employee_id
            INNER JOIN roles ON employees.role_id = roles.role_id
            WHERE employees.email = ? AND accounts.password = ?`;

            db.query(sql2, [employee.email, employee.password], (err, finaldata)=>{
                console.log(sql)
                if(err){
                    //reject(err);
                }
                console.log(finaldata);
                resolve(finaldata);
            });
            if(err){
                //reject(err);
            }
            // resolve(data);
        });
    },

    logoutEmployee: (id, resolve, reject, next) =>{

        let sql = `UPDATE accounts 
        INNER JOIN employees ON accounts.employee_id = employees.employee_id
        SET accounts.is_active = '0'
        WHERE employees.employee_id = ?`;
        console.log(id)

        db.query(sql, id, (err, data)=>{
            console.log(data)   
        })

    }

}

module.exports = systemEmployee;
