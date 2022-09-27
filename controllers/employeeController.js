const employeeRepo = require('../repos/employee');
const jwt = require("jsonwebtoken");


module.exports.createReimbursmentItem = async (req,res,next)=>{
  
    const authHeader = req.headers["authorization"];
   
    jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);
        let id = decoded.employee_id
        console.log("eto112");
        console.log(id)
        if(id){
            employeeRepo.getReimbursementByEmployeeId(id, (data)=>{ 
                console.log("meron laman data")
                console.log(data[0])
                let reimbursementDetails = data[0];
               
                console.log("woo")
                console.log(reimbursementDetails)
        
                if(data[0]){
                    let reimbursementItemDetails = {
                        "date_added": new Date(),
                        "or_number": req.body.or_number,
                        "name_of_establishment": req.body.name_of_establishment,
                        "flex_reimbursement_id": reimbursementDetails.flex_reimbursement_id,
                        "tin_of_establishment": req.body.tin_of_establishment,
                         "amount": req.body.amount,
                        "category_id": req.body.category_id,
                        "status" : "draft"
                    }
                    let totalAmount = parseFloat(reimbursementDetails.total_reimbursement_amount) + parseFloat(reimbursementItemDetails.amount);
                    console.log(totalAmount);

                   employeeRepo.addReimbursementItemDetails(reimbursementItemDetails, (data)=>{
                        console.log("firethis2")
                        console.log(data)
                        
                   })
                   employeeRepo.updateTotalReimbursementAmount(totalAmount,id,(data)=>{
                    console.log("firethis3")
                    console.log(data)
                   })
                } else {
                    console.log("no existing reimbursement")
                    let newReimbursementDetails = {
                        "employee_id": id,
                        "flex_cutoff_id": 2,
                        "total_reimbursement_amount": req.body.amount,
                        "status" : "draft"
                        
                    }
                    let totalAmount = newReimbursementDetails.total_reimbursement_amount

                   
                    employeeRepo.addFlexReimbursement(newReimbursementDetails, (data)=>{
                        console.log("firethis4")
                        console.log(data)
                        //next()
                    })
                    
                    employeeRepo.getReimbursementByEmployeeId(id, (data)=>{
                        let reimbursementDetails = data[0];
                        if(data[0]){
                            let reimbursementItemDetails = {
                                "date_added": new Date(),
                                "or_number": req.body.or_number,
                                "name_of_establishment": req.body.name_of_establishment,
                                "flex_reimbursement_id": reimbursementDetails.flex_reimbursement_id,
                                "tin_of_establishment": req.body.tin_of_establishment,
                                 "amount": req.body.amount,
                                "category_id": req.body.category_id,
                                "status" : "draft"
                            }
                            employeeRepo.addReimbursementItemDetails(reimbursementItemDetails, (data)=>{
                                console.log("firethis2")
                                console.log(data)
                                
                           })
                           employeeRepo.updateTotalReimbursementAmount(totalAmount,id,(data)=>{
                            console.log("firethis3")
                            console.log(data)
                           })
                        }
                    })

                }
          })
      
        } else{
        return res.sendStatus(403);
        }
        
      });  
   
}