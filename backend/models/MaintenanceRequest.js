const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  flat:        { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  title:       { type: String, required: true },
  description: { type: String },
  priority:    { type: String, enum: ['low','medium','high'], default: 'low' },
  status:      { type: String, enum: ['open','in_progress','closed'], default: 'open' },
  reportedBy:  { type: String },
  dueDate:     { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceRequest', maintenanceSchema);
