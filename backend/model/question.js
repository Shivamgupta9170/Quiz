// models/Question.js

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
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;  // Make sure you export the model


  