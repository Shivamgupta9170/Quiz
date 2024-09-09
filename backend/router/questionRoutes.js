// routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/questioncontroller');
const isAdmin = require('../middleware/isAdmin');
const authenticateToken = require('../middleware/authenticateToken');
const { questionValidationRules } = require('../helpers/validator');

// Admin routes
router.post('/addquestion', authenticateToken,isAdmin,questionValidationRules, questionControllers.addQuestion);
// routes/questionRoutes.js
router.put('/updateQuestion/:id', authenticateToken, isAdmin, questionValidationRules, questionControllers.updateQuestion);
router.delete('/deleteQuestion/:id',authenticateToken, isAdmin, questionControllers.deleteQuestion);

module.exports = router;
