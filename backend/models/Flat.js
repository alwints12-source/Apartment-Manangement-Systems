const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  block:    { type: String, required: true },
  unit:     { type: String, required: true },
  bedrooms: { type: Number, default: 2 },
  areaSqft: { type: Number, default: 800 },
  status:   { type: String, enum: ['vacant','occupied','maintenance'], default: 'vacant' }
}, { timestamps: true });

flatSchema.index({ block: 1, unit: 1 }, { unique: true });
module.exports = mongoose.model('Flat', flatSchema);
