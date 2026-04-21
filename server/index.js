const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const authRoutes = require('./routes/auth');
const trackerRoutes = require('./routes/tracker');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracker', trackerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Freedom Path API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
