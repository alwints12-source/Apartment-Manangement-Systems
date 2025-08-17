// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect DB
connectDB();

// CORS (allow CRA/Vite during local dev)
const allowlist = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean));

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowlist.has(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flats', require('./routes/flatRoutes'));
app.use('/api/tenants', require('./routes/tenantRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));

// Healthcheck
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// Start server
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;