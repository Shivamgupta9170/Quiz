// controllers/questionController.js
const Question = require('../model/question');
const { validationResult } = require('express-validator');

// Add Question to a Quiz
const addQuestion = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { quizId, questionText, options, correctAnswer } = req.body;

    try {
        const newQuestion = new Question({
            quizId,
            questionText,
            options,
            correctAnswer
        });

        const savedQuestion = await newQuestion.save();
        return res.status(201).json({ success: true, data: savedQuestion });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Update Question
const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ success: false, msg: 'Question not found' });
        }

        question.questionText = questionText || question.questionText;
        question.options = options || question.options;
        question.correctAnswer = correctAnswer || question.correctAnswer;

        const updatedQuestion = await question.save();
        return res.status(200).json({ success: true, data: updatedQuestion });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Delete Question
const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await Question.findByIdAndDelete(questionId);
        if (!question) {
            return res.status(404).json({ success: false, msg: 'Question not found' });
        }
        return res.status(200).json({ success: true, msg: 'Question deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

module.exports = {
    addQuestion,
    updateQuestion,
    deleteQuestion
};
