const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json())
let router = express.Router();
const jwt = require("jsonwebtoken");

const system = require('./repos/system');
const loginController = require('./controllers/loginController');
const { propfind } = require('./routes/login');

const hrJWT = require('./middleware/userJWT/hrJWT')

app.use("/login", require('./routes/login'))
app.use("/employee", require('./routes/employeeRoute'));

router.get('/getLogin', hrJWT,(req,res)=>{
    system.findAllEmployee((data)=>{
        console.log(data)
        res.send(data)
    })
});

router.put('/logout', (req,res)=>{
    const authHeader = req.headers["authorization"];
    jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);
        let id = decoded.employee_id
        console.log(decoded);
        console.log(id)
        if(id){
         system.logoutEmployee(id)
         res.sendStatus(200)
        } else{
        return res.sendStatus(403);
        }
        
      });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.use('/api/',router);