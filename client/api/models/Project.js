const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['ai', 'web'], required: true },
  tags:        [{ type: String }],
  icon:        { type: String, default: 'folder' },
  githubUrl:   { type: String, default: '' },
  imageUrl:    { type: String, default: '' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
