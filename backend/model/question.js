const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [String], // Array of options (option_1, option_2, etc.)
      required: true
    },
    correctAnswer: {
      type: String,
      enum: ['option_1', 'option_2', 'option_3', 'option_4'],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Question = mongoose.model('Question', questionSchema);
  module.exports = Question;
  