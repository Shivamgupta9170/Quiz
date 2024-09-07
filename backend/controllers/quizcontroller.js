// controllers/quizController.js
const Quiz = require('../model/quiz');
const { validationResult } = require('express-validator');

// Create Quiz
const createQuiz = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
        const newQuiz = new Quiz({
            title,
            description,
            adminId: req.user._id // Assuming the admin is authenticated
        });

        const savedQuiz = await newQuiz.save();
        return res.status(201).json({ success: true, data: savedQuiz });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Get All Quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        return res.status(200).json({ success: true, data: quizzes });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Update Quiz
const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const { title, description } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, msg: 'Quiz not found' });
        }

        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;

        const updatedQuiz = await quiz.save();
        return res.status(200).json({ success: true, data: updatedQuiz });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await Quiz.findByIdAndDelete(quizId);
        if (!quiz) {
            return res.status(404).json({ success: false, msg: 'Quiz not found' });
        }
        return res.status(200).json({ success: true, msg: 'Quiz deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz
};
