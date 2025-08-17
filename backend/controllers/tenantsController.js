const Tenant = require('../models/Tenant');
const Flat = require('../models/Flat');

exports.list = async (_req, res, next) => {
  try { res.json(await Tenant.find().populate('flat').sort({ createdAt: -1 })); }
  catch(e){ next(e); }
};
exports.create = async (req, res, next) => {
  try {
    const t = await Tenant.create(req.body);
    await Flat.findByIdAndUpdate(t.flat, { status: 'occupied' });
    res.status(201).json(t);
  } catch(e){ next(e); }
};
exports.update = async (req, res, next) => {
  try { const t = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(t); }
  catch(e){ next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const t = await Tenant.findByIdAndDelete(req.params.id);
    if (t) {
      const count = await Tenant.countDocuments({ flat: t.flat, isActive: true });
      if (count === 0) await Flat.findByIdAndUpdate(t.flat, { status: 'vacant' });
    }
    res.json({ message: 'Tenant deleted' });
  } catch(e){ next(e); }
};
