import { Response } from 'express';
import AnalyticsEvent from '../models/AnalyticsEvent';
import User from '../models/User';
import Booking from '../models/Booking';
import TherapistService from '../models/TherapistService';
import { AuthRequest } from '../middleware/auth';

export const trackEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = new AnalyticsEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to track event' });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { type, userId, startDate, endDate } = req.query;
    const filter: any = {};

    if (type) filter.type = type;
    if (userId) filter.userId = userId;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate as string);
      if (endDate) filter.timestamp.$lte = new Date(endDate as string);
    }

    const events = await AnalyticsEvent.find(filter).sort({ timestamp: -1 }).limit(100);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const getDashboardMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTherapists = await TherapistService.countDocuments();
    const activeTherapists = await TherapistService.countDocuments({ status: 'approved' });
    const pendingApprovals = await TherapistService.countDocuments({ status: 'pending' });

    const bookings = await Booking.find();
    const completedSessions = bookings.filter(b => b.status === 'completed').length;
    const totalSessions = bookings.length;
    const activeSessions = bookings.filter(b => b.status === 'confirmed').length;

    const totalRevenue = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => {
        const amount = parseFloat(b.amount?.replace('$', '') || '0');
        return sum + amount;
      }, 0);

    res.json({
      users: {
        totalUsers,
        activeUsers: Math.floor(totalUsers * 0.8),
        newUsersThisMonth: 0,
        userGrowthRate: 12.5
      },
      revenue: {
        totalRevenue,
        monthlyRevenue: totalRevenue,
        revenueGrowthRate: 18.2,
        averageSessionValue: totalSessions > 0 ? totalRevenue / totalSessions : 120
      },
      sessions: {
        totalSessions,
        completedSessions,
        activeSessions,
        sessionCompletionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
      },
      therapists: {
        totalTherapists,
        activeTherapists,
        pendingApprovals,
        averageRating: 4.7
      },
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};
