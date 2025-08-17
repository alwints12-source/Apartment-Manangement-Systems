const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: String },
  flat:       { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  leaseStart: { type: Date, required: true },
  leaseEnd:   { type: Date, required: true },
  isActive:   { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
