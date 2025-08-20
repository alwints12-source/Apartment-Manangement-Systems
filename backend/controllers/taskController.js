// backend/controllers/taskController.js
const Task = require('../models/Task'); // <-- Ensure file is backend/models/Task.js (capital T)

// @desc    Add new task
// @route   POST /api/tasks
// @access  Private
const addTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body || {};
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      deadline,
    });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    Get tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    if (req.body.deadline !== undefined) task.deadline = req.body.deadline;

    const updated = await task.save();
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Prefer remove() (to satisfy your test stubbing), fallback to deleteOne()
    if (typeof task.remove === 'function') {
      await task.remove();
    } else {
      await task.deleteOne();
    }
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };