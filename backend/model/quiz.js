const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
  module.exports = Quiz;
  