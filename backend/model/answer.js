
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
      enum: ['option_1', 'option_2', 'option_3', 'option_4'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);
  module.exports = UserAnswer;
  