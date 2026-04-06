const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// ─── MODELS (inline require to avoid path issues) ───
const modelsDir = path.join(__dirname, 'models');
const routesDir = path.join(__dirname, 'routes');
const middlewareDir = path.join(__dirname, 'middleware');

// ─── DB CONNECTION ───
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  mongoose.set('bufferCommands', false);
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

// ─── APP ───
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect DB before each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'DB error', error: err.message });
  }
});

// ─── ROUTES ───
app.use('/api/auth',     require(path.join(routesDir, 'auth')));
app.use('/api/projects', require(path.join(routesDir, 'projects')));
app.use('/api/skills',   require(path.join(routesDir, 'skills')));
app.use('/api/timeline', require(path.join(routesDir, 'timeline')));
app.use('/api/profile',  require(path.join(routesDir, 'profile')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: isConnected });
});

module.exports = app;
