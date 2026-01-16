// models/Restaurant.js - CORRECT
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  position: Number,
  title: { type: String, required: true },
  address: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  ratingCount: Number,
  priceLevel: [String],
  type: [String],
  enfant: Boolean,
  halal: String,
  Vegetarien: Boolean,
  category: [String],
  ambiance: [String],
  phoneNumber: String,
  website: String,
  cid: String
}, {
  timestamps: true
});

// Index pour améliorer les performances
restaurantSchema.index({ address: 'text', title: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema, 'restaurants');