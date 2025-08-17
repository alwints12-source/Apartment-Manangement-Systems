const router = require('express').Router();
const c = require('../controllers/maintenanceController');
const requireAuth = require('../middleware/auth');

router.get('/', requireAuth, c.list);
router.post('/', requireAuth, c.create);
router.patch('/:id', requireAuth, c.update);
router.delete('/:id', requireAuth, c.remove);

module.exports = router;
