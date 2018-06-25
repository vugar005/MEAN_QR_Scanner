const mongoose = require('mongoose');

const qrUrlSchema = new mongoose.Schema({
  url: {type: String, required: true},
  date: {type: Date},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('QrUrl', qrUrlSchema);
