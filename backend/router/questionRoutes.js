// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const { addQuestion, updateQuestion, deleteQuestion } = require('../controllers/questioncontroller');
const { isAdmin } = require('../middleware/isAdmin');
const authenticateToken = require('../middleware/authenticateToken');
const { questionValidationRules } = require('../helpers/validator');

// Admin routes
router.post('/addquestion',authenticateToken, isAdmin, questionValidationRules, addQuestion);
// router.put('/:questionId',authenticateToken,isAdmin, questionValidationRules, updateQuestion);
// router.delete('/:questionId',authenticateToken, isAdmin, deleteQuestion);

module.exports = router;
