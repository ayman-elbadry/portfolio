require('dotenv').config({ path: require('path').join(__dirname, '..', 'server', '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ─── DB CONNECTION (singleton) ───
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ MongoDB erreur:', err.message);
    throw err;
  }
};

// ─── EXPRESS APP ───
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─── IMPORT ROUTES ───
const authRoutes     = require('../server/routes/auth');
const projectRoutes  = require('../server/routes/projects');
const skillRoutes    = require('../server/routes/skills');
const timelineRoutes = require('../server/routes/timeline');
const profileRoutes  = require('../server/routes/profile');

// ─── CONNECT DB BEFORE EACH REQUEST ───
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Erreur de connexion à la base de données' });
  }
});

// ─── MOUNT ROUTES ───
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/profile',  profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── EXPORT FOR VERCEL ───
module.exports = app;
