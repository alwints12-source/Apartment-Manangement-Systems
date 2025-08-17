const Invoice = require('../models/Invoice');

exports.list = async (req, res, next) => {
  try {
    const q = {};
    if (req.query.flat) q.flat = req.query.flat;
    if (req.query.month) q.month = req.query.month;
    const inv = await Invoice.find(q).populate('flat tenant').sort({ month: -1, createdAt: -1 });
    res.json(inv);
  } catch(e){ next(e); }
};
exports.create = async (req, res, next) => {
  try {
    if (!req.body.total && Array.isArray(req.body.items)) {
      req.body.total = req.body.items.reduce((s, it) => s + Number(it.amount || 0), 0);
    }
    const inv = await Invoice.create(req.body);
    res.status(201).json(inv);
  } catch(e){
    if (e.code === 11000) return res.status(409).json({ message: 'Invoice already exists for this flat/month' });
    next(e);
  }
};
exports.addPayment = async (req, res, next) => {
  try {
    const { amount, method, note } = req.body;
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ message: 'Invoice not found' });
    inv.payments.push({ amount, method, note });
    const paid = inv.payments.reduce((s, p) => s + Number(p.amount || 0), 0);
    if (paid <= 0) inv.status = 'unpaid';
    else if (paid < inv.total) inv.status = 'partially_paid';
    else inv.status = 'paid';
    await inv.save();
    res.json(inv);
  } catch(e){ next(e); }
};
exports.update = async (req, res, next) => {
  try { const inv = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(inv); }
  catch(e){ next(e); }
};
exports.remove = async (req, res, next) => {
  try { await Invoice.findByIdAndDelete(req.params.id); res.json({ message: 'Invoice deleted' }); }
  catch(e){ next(e); }
};
