const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name:        { type: String, default: 'Aymane El Badry' },
  title:       { type: String, default: "Étudiant en Master d'Excellence en IA & Développeur Web Full Stack" },
  subtitle:    { type: String, default: '' },
  description: { type: String, default: '' },
  about:       { type: String, default: '' },
  email:       { type: String, default: 'elbaderyayman47@gmail.com' },
  phone:       { type: String, default: '+212 684 795 036' },
  linkedin:    { type: String, default: 'https://www.linkedin.com/in/aymane-el-badry/' },
  github:      { type: String, default: 'https://github.com/' },
  location:    { type: String, default: 'Casablanca, Maroc' },
  avatarUrl:   { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
