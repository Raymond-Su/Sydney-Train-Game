const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('UserScore', scoreSchema);
