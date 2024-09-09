// controllers/questionController.js
const Question = require('../model/question');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Add Question to a Quiz

const addQuestion = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { quizId, questionText, options, correctAnswer } = req.body;

    // Custom validation to ensure correctAnswer is one of the options
    if (!options.includes(correctAnswer)) {
        return res.status(400).json({ success: false, msg: 'Correct answer must be one of the provided options.' });
    }

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
        return res.status(500).json({ success: false, msg: error.message || 'An error occurred while saving the question.' });
    }
};



const updateQuestion = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, msg: "Validation error", errors: errors.array() });
    }

    const questionId = req.params.id; // Assuming you're using URL parameters
    const updateData = req.body;

    // Ensure that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(400).json({ success: false, msg: 'Invalid question ID' });
    }

    try {
        // Find the question by ID and update
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, updateData, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ success: false, msg: "Question not found" });
        }

        res.status(200).json({
            success: true,
            msg: 'Question updated successfully',
            data: updatedQuestion
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'An error occurred while updating the question.', error: error.message });
    }
};





// Delete Question
const deleteQuestion = async (req, res) => {
    const  questionId  = req.params.id;

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
