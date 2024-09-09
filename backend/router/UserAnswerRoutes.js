const express = require('express');
const router = express.Router();
const {addUserAnswer} = require('../controllers/userAnswerController');
const authenticateToken = require('../middleware/authenticateToken');
const  {userAnswerValidationRules}  = require('../helpers/validator');


router.post("/addAnswer",authenticateToken,userAnswerValidationRules,addUserAnswer);



module.exports = router;