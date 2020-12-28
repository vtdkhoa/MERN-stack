const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('task', TaskSchema)