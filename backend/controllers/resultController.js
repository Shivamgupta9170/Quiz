const Question = require('../model/question');
const UserAnswer = require('../model/answer');
const Result = require('../model/result');
const User = require('../model/user');
const Quiz = require('../model/quiz');

// Controller function to calculate the user's score
const calculateScore = async (req, res) => {
    try {
        const { userId, quizId } = req.body;

        // Validate user and quiz existence
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

        // Fetch all questions for the quiz
        const questions = await Question.find({ quizId });
        if (questions.length === 0) return res.status(404).json({ error: 'No questions found for this quiz' });

        // Fetch user's answers for the quiz
        const userAnswers = await UserAnswer.find({ userId, quizId });
        if (userAnswers.length === 0) return res.status(404).json({ error: 'No answers found for this user and quiz' });

        // Calculate score
        let score = 0;
        questions.forEach((question) => {
            const userAnswer = userAnswers.find(answer => answer.questionId.toString() === question._id.toString());
            if (userAnswer && userAnswer.selectedAnswer === question.correctAnswer) {
                score++;
            }
        });

        // Save the result in the database
        const result = new Result({
            userId,
            quizId,
            score,
        });

        await result.save();

        // Return the calculated score
        res.json({
            message: 'Score calculated successfully',
            score,
            resultId: result._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserResult = async (req, res) => {
    try {
        const { userId, quizId } = req.body;

        // Find the result for the user and quiz
        const result = await Result.findOne({ userId, quizId });

        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }

        // Return the result
        res.json({
            message: 'Result retrieved successfully',
            result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    calculateScore,
    getUserResult
};
