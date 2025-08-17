const Flat = require('../models/Flat');

exports.list = async (_req, res, next) => {
  try { res.json(await Flat.find().sort({ block: 1, unit: 1 })); }
  catch(e){ next(e); }
};
exports.create = async (req, res, next) => {
  try { const f = await Flat.create(req.body); res.status(201).json(f); }
  catch(e){ next(e); }
};
exports.update = async (req, res, next) => {
  try { const f = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(f); }
  catch(e){ next(e); }
};
exports.remove = async (req, res, next) => {
  try { await Flat.findByIdAndDelete(req.params.id); res.json({ message: 'Flat deleted' }); }
  catch(e){ next(e); }
};
