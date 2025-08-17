const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: user._id, name: user.name, email: user.email, token });
  } catch (e) { next(e); }
};

exports.me = async (req, res, next) => {
  try {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
  } catch (e) { next(e); }
};
