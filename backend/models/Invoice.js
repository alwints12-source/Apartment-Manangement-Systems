const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  flat:   { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  month:  { type: String, required: true }, // YYYY-MM
  items: [{
    label:  { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }
  }],
  total:  { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['unpaid','partially_paid','paid'], default: 'unpaid' },
  payments: [{
    date:   { type: Date, default: Date.now },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ['cash','card','bank','online'], default: 'online' },
    note:   { type: String }
  }]
}, { timestamps: true });

invoiceSchema.index({ flat: 1, month: 1 }, { unique: true });
module.exports = mongoose.model('Invoice', invoiceSchema);
