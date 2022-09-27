const jwt = require("jsonwebtoken");
const systemEmployee = require('../../repos/system');

require("dotenv").config();
const hrJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  

  jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    let role = decoded.role
    let id = decoded.employee_id
    console.log(id);
    if(role === 'HR'){
      systemEmployee.findEmployeeById(id, (result)=>{
        payload = JSON.parse(JSON.stringify(result))[0];
        console.log(payload);
        let isActive = payload.active;
        console.log(isActive);
    
    //next()
        if(isActive){
            next();
        } //return res.statusMessage = "Please Log in";
        return res.send('Unauthorized access');
      })
    } else{
        return res.send('Unauthorized access');
   
    }
    
  });
};


module.exports = hrJWT