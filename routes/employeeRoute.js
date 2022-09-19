const express = require('express');
const router = express.Router();
const employeeJWT = require('../middleware/userJWT/employeeJWT');

const app = express();
const employeeController = require('../controllers/employeeController');
app.use('/api/',router);

router.post('/add/reimbursement',employeeJWT, employeeController.createReimbursmentItem);

module.exports = router;