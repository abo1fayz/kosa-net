// models/Repair.js
const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'إصلاح ناجح'
  },
  imageURL: {
    type: String,
    required: [true, 'رابط الصورة إجباري.']
  }
}, {
  timestamps: true
});

const Repair = mongoose.model('Repair', repairSchema);

module.exports = Repair;
