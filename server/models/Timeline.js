const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  type:        { type: String, enum: ['experience', 'education'], required: true },
  title:       { type: String, required: true },
  company:     { type: String, required: true },    // Entreprise ou école
  location:    { type: String, default: 'Casablanca' },
  dates:       { type: String, required: true },     // Ex: "2022 — 2024"
  description: { type: String, default: '' },
  tags:        [{ type: String }],
  icon:        { type: String, default: 'building-2' },
  isCurrent:   { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
