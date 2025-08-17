//const jwt = require('jsonwebtoken');
//const User = require('../models/User');

//module.exports = async function requireAuth(req, res, next){
  //try {
    //const auth = req.headers.authorization || '';
    //const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    //if (!token) return res.status(401).json({ message: 'Missing token' });
    //const payload = jwt.verify(token, process.env.JWT_SECRET);
    //const user = await User.findById(payload.sub);
    //if (!user) return res.status(401).json({ message: 'Invalid token' });
    //req.user = user;
    //next();
  //} catch (e) {
    //return res.status(401).json({ message: 'Unauthorized' });
  //}
//};
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized', reason: 'missing_token' });

    let payload;
    try { payload = jwt.verify(token, process.env.JWT_SECRET); }
    catch (e) { return res.status(401).json({ message: 'Unauthorized', reason: e.message }); }

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Unauthorized', reason: 'user_not_found' });

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized', reason: 'unexpected' });
  }
};