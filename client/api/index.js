const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ══════════════════════════════════════════
// MODELS
// ══════════════════════════════════════════

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function(p) { return bcrypt.compare(p, this.password); };
userSchema.methods.toJSON = function() { const o = this.toObject(); delete o.password; return o; };
const User = mongoose.models.User || mongoose.model('User', userSchema);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true }, description: { type: String, required: true },
  category: { type: String, enum: ['ai','web'], required: true },
  tags: [String], icon: { type: String, default: 'folder' },
  githubUrl: { type: String, default: '' }, imageUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['ai','front','back','db','tool','lang'], required: true },
  level: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '' },
}, { timestamps: true });
const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);

const timelineSchema = new mongoose.Schema({
  type: { type: String, enum: ['experience','education'], required: true },
  title: { type: String, required: true }, company: { type: String, required: true },
  location: { type: String, default: 'Casablanca' }, dates: { type: String, required: true },
  description: { type: String, default: '' }, tags: [String],
  icon: { type: String, default: 'building-2' }, isCurrent: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Aymane El Badry' },
  title: { type: String, default: '' }, subtitle: { type: String, default: '' },
  description: { type: String, default: '' }, about: { type: String, default: '' },
  email: { type: String, default: '' }, phone: { type: String, default: '' },
  linkedin: { type: String, default: '' }, github: { type: String, default: '' },
  location: { type: String, default: 'Casablanca, Maroc' }, avatarUrl: { type: String, default: '' },
}, { timestamps: true });
const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

// ══════════════════════════════════════════
// DB CONNECTION
// ══════════════════════════════════════════
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  mongoose.set('bufferCommands', false);
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

// ══════════════════════════════════════════
// AUTH MIDDLEWARE
// ══════════════════════════════════════════
const auth = async (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer ')) return res.status(401).json({ message: 'Token manquant' });
    const decoded = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' });
    req.user = user;
    next();
  } catch { res.status(401).json({ message: 'Token invalide' }); }
};

// ══════════════════════════════════════════
// EXPRESS APP
// ══════════════════════════════════════════
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(async (req, res, next) => {
  try { await connectDB(); next(); }
  catch (err) { res.status(500).json({ message: 'DB error', error: err.message }); }
});

// ── AUTH ──
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).json({ message: 'Erreur serveur', error: err.message }); }
});
app.get('/api/auth/me', auth, (req, res) => res.json({ user: req.user }));

// ── PROJECTS ──
app.get('/api/projects', async (req, res) => {
  try { res.json(await Project.find().sort({ order: 1, createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
app.get('/api/projects/:id', async (req, res) => {
  try { const p = await Project.findById(req.params.id); p ? res.json(p) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
app.post('/api/projects', auth, async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
app.put('/api/projects/:id', auth, async (req, res) => {
  try { const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); p ? res.json(p) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/projects/:id', auth, async (req, res) => {
  try { const p = await Project.findByIdAndDelete(req.params.id); p ? res.json({ message: 'Supprimé' }) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// ── SKILLS ──
app.get('/api/skills', async (req, res) => {
  try { const f = req.query.category ? { category: req.query.category } : {}; res.json(await Skill.find(f).sort({ category: 1, name: 1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
app.post('/api/skills', auth, async (req, res) => {
  try { res.status(201).json(await Skill.create(req.body)); } catch (err) { res.status(400).json({ message: err.message }); }
});
app.put('/api/skills/:id', auth, async (req, res) => {
  try { const s = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); s ? res.json(s) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/skills/:id', auth, async (req, res) => {
  try { const s = await Skill.findByIdAndDelete(req.params.id); s ? res.json({ message: 'Supprimé' }) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// ── TIMELINE ──
app.get('/api/timeline', async (req, res) => {
  try { const f = req.query.type ? { type: req.query.type } : {}; res.json(await Timeline.find(f).sort({ order: 1, createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
app.post('/api/timeline', auth, async (req, res) => {
  try { res.status(201).json(await Timeline.create(req.body)); } catch (err) { res.status(400).json({ message: err.message }); }
});
app.put('/api/timeline/:id', auth, async (req, res) => {
  try { const t = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); t ? res.json(t) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
app.delete('/api/timeline/:id', auth, async (req, res) => {
  try { const t = await Timeline.findByIdAndDelete(req.params.id); t ? res.json({ message: 'Supprimé' }) : res.status(404).json({ message: 'Non trouvé' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// ── PROFILE ──
app.get('/api/profile', async (req, res) => {
  try { let p = await Profile.findOne(); if (!p) p = await Profile.create({}); res.json(p); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
app.put('/api/profile', auth, async (req, res) => {
  try { let p = await Profile.findOne(); if (!p) { p = await Profile.create(req.body); } else { Object.assign(p, req.body); await p.save(); } res.json(p); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

// ── HEALTH ──
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: isConnected }));

module.exports = app;
