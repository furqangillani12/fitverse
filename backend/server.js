require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Fitverse API', version: '1.0.0' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/workouts', require('./routes/workoutRoutes'));
// app.use('/api/meals', require('./routes/mealRoutes'));
// app.use('/api/social', require('./routes/socialRoutes'));
// app.use('/api/sos', require('./routes/sosRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Fitverse API running on port ${PORT}`);
});
