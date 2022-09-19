const jwt = require("jsonwebtoken");
require("dotenv").config();
const systemEmployee = require('../repos/system');

const login = async (req, res) => {

    const user = {
        "email":`%${req.body.email}%`,
        "password":`%${req.body.password}%`
    };
  
    if (!user.password || !user.email) {
      return res    
        .status(400)
        .json({ message: "Credentials are required" });
    }
    let login = systemEmployee.loginEmployee(req.body, (result) => {

        payload = JSON.parse(JSON.stringify(result))[0];

        if (result.length) {
            const accessToken = jwt.sign(payload, process.env.JWT_KEY);
            res.json({accessToken});
        }   
    },
    (err) => {
    next(err);
    });
};


module.exports = {login};