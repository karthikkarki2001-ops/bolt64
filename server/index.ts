import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import moodRoutes from './routes/moodRoutes';
import therapyRoutes from './routes/therapyRoutes';
import therapistServiceRoutes from './routes/therapistServiceRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import chatRoutes from './routes/chatRoutes';
import streakRoutes from './routes/streakRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/therapy', therapyRoutes);
app.use('/api/therapist-services', therapistServiceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/streak', streakRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MindCare API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
