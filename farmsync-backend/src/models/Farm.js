const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a farm name'], trim: true, maxlength: [50, 'Name cannot be more than 50 characters'] },
  location: { type: String, required: [true, 'Please add a location'] },
  size: { type: Number, required: [true, 'Please add farm size in acres'] },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farm', FarmSchema);