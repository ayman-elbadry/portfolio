const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, enum: ['ai', 'front', 'back', 'db', 'tool', 'lang'], required: true },
  level:    { type: Number, min: 0, max: 100, default: 80 },
  icon:     { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
