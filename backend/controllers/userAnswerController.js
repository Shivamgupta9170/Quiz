const UserAnswer = require('../model/answer');
const { validationResult } = require('express-validator');


const addUserAnswer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { userId, quizId, questionId, selectedAnswer } = req.body;

        const newUserAnswer = new UserAnswer({
            userId,
            quizId,
            questionId,
            selectedAnswer
        });

        const savedAnswer = await newUserAnswer.save();
        res.status(201).json({ success: true, msg: 'Answer submitted successfully', data: savedAnswer });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Failed to submit the answer', error: error.message });
    }
};


module.exports = {
    addUserAnswer
};