const express = require('express');
const router = express.Router();
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskcontroller');
const auth = require('../middleware/auth');

router.post('/', auth, addTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;