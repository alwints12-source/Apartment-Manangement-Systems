const MaintenanceRequest = require('../models/MaintenanceRequest');

exports.list = async (req, res, next) => {
  try {
    const q = {};
    if (req.query.status) q.status = req.query.status;
    const items = await MaintenanceRequest.find(q).populate('flat').sort({ createdAt: -1 });
    res.json(items);
  } catch(e){ next(e); }
};
exports.create = async (req, res, next) => {
  try { const m = await MaintenanceRequest.create(req.body); res.status(201).json(m); }
  catch(e){ next(e); }
};
exports.update = async (req, res, next) => {
  try { const m = await MaintenanceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(m); }
  catch(e){ next(e); }
};
exports.remove = async (req, res, next) => {
  try { await MaintenanceRequest.findByIdAndDelete(req.params.id); res.json({ message: 'Maintenance request deleted' }); }
  catch(e){ next(e); }
};
