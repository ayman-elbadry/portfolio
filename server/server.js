require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes     = require('./routes/auth');
const projectRoutes  = require('./routes/projects');
const skillRoutes    = require('./routes/skills');
const timelineRoutes = require('./routes/timeline');
const profileRoutes  = require('./routes/profile');

const app = express();

// ─── MIDDLEWARE ───
app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      'http://localhost:5173',
      process.env.CLIENT_URL,
    ].filter(Boolean);
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for portfolio
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// ─── ROUTES ───
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/profile',  profileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── START ───
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
});
