const employeeRepo = require('../repos/employee');

module.exports.createReimbursmentItem = (req,res)=>{
    let reimbursementItem = {
        //"date_added": req.body.date_added,
        "or_number": req.body.or_number,
        // "name_of_establishment": `%${req.body.name_of_establishment}%`,
        // "tin_of_establishment": `%${req.body.tin_of_establishment}%`,
        // "amount": `%${req.body.amount}%`,
        // "category": `%${req.body.category}%`
    }
    employeeRepo.addReimbursementItem(reimbursementItem,(data)=>{
        console.log("here")
        console.log(reimbursementItem)
        //res.send(data)
    })
}