const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Create new itinerary
router.post('/', async (req, res) => {
  const itinerary = new Itinerary({
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    activities: req.body.activities,
    accommodations: req.body.accommodations,
    user: req.session.userId
  });

  try {
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all itineraries for current user
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.session.userId });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single itinerary for current user
router.get('/:id', getItinerary, (req, res) => {
  res.json(res.itinerary);
});

// Update itinerary
router.patch('/:id', getItinerary, async (req, res) => {
  if (req.body.destination != null) {
    res.itinerary.destination = req.body.destination;
  }
  if (req.body.startDate != null) {
    res.itinerary.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.itinerary.endDate = req.body.endDate;
  }
  if (req.body.activities != null) {
    res.itinerary.activities = req.body.activities;
  }
  if (req.body.accommodations != null) {
    res.itinerary.accommodations = req.body.accommodations;
  }

  try {
    const updatedItinerary = await res.itinerary.save();
    res.json(updatedItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete itinerary
router.delete('/:id', getItinerary, async (req, res) => {
  try {
    await res.itinerary.remove();
    res.json({ message: 'Itinerary deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get single itinerary for current user
async function getItinerary(req, res, next) {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.session.userId });
    if (itinerary == null) {
      return res.status(404).json({ message: 'Cannot find itinerary' });
    }
    res.itinerary = itinerary;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
