const express = require('express');
const Timeline = require('../models/Timeline');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/timeline — public (optional ?type=experience|education)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const items = await Timeline.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});

// POST /api/timeline — admin
router.post('/', auth, async (req, res) => {
  try {
    const item = await Timeline.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides.', error: error.message });
  }
});

// PUT /api/timeline/:id — admin
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Élément non trouvé.' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides.', error: error.message });
  }
});

// DELETE /api/timeline/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Timeline.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Élément non trouvé.' });
    res.json({ message: 'Élément supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
});

module.exports = router;
