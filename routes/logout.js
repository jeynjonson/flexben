const jwt = require("jsonwebtoken");
const express = require('express');
require("dotenv").config();
const app = express();
app.use(express.json())
let router = express.Router();
const system = require('../repos/system');




// router.put('/logout', (req,res)=>{
//     const authHeader = req.headers["authorization"];
//     jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
//         if (err) return res.sendStatus(403);
//         let id = decoded.employee_id
//         console.log(decoded);
//         if(id){
//          system.logoutEmployee(authHeader, (result)=>{

//          })
//         } else{
//         return res.sendStatus(403);
//         }
        
//       });
// });

module.exports = router;