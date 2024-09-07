const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  otp: {
    type: Number,
    required: true,
  },
  timestamp:{
    type:Date,
    default:Date.now,
    required:true,
    get: (timestamp)=>timestamp.getTime(),
    set: (timestamp)=>new Date(timestamp),
  }
});

const OTP = mongoose.model('otp', otpSchema);
module.exports = OTP;