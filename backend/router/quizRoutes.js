// routes/quizRoutes.js
// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { createQuiz, updateQuiz, deleteQuiz, getAllQuizzes } = require('../controllers/quizcontroller');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const { quizValidationRules } = require('../helpers/validator');

// Admin routes
router.post('/createquiz', authenticateToken, isAdmin, quizValidationRules, createQuiz);
router.put('/:quizId', authenticateToken, isAdmin, quizValidationRules, updateQuiz);
router.delete('/:quizId', authenticateToken, isAdmin, deleteQuiz);

// Public route
router.get('/', getAllQuizzes);

module.exports = router;

