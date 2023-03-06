const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  activities: [{
    name: {
      type: String,
      required: true
    },
    location: String,
    cost: Number
  }],
  accommodations: [{
    name: {
      type: String,
      required: true
    },
    location: String,
    cost: Number
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
