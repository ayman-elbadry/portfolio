const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// ─── DB CONNECTION (singleton for serverless) ───
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI non définie');
  }
  mongoose.set('bufferCommands', false);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ MongoDB erreur:', err.message);
    isConnected = false;
    throw err;
  }
};

// ─── EXPRESS APP ───
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─── IMPORT ROUTES (using path.join for serverless compatibility) ───
const serverDir = path.join(__dirname, '..', 'server');
const authRoutes     = require(path.join(serverDir, 'routes', 'auth'));
const projectRoutes  = require(path.join(serverDir, 'routes', 'projects'));
const skillRoutes    = require(path.join(serverDir, 'routes', 'skills'));
const timelineRoutes = require(path.join(serverDir, 'routes', 'timeline'));
const profileRoutes  = require(path.join(serverDir, 'routes', 'profile'));

// ─── CONNECT DB BEFORE EACH REQUEST ───
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB middleware error:', err);
    res.status(500).json({ message: 'Erreur de connexion à la base de données', error: err.message });
  }
});

// ─── MOUNT ROUTES ───
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/profile',  profileRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), db: isConnected });
});

// Catch-all for debugging
app.all('/api/*', (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} non trouvée` });
});

// ─── EXPORT FOR VERCEL ───
module.exports = app;
