
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userAnswerSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selectedAnswer: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);
  module.exports = UserAnswer;
  