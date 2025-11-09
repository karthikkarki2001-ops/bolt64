# MindCare - Mental Health Platform

A comprehensive mental health platform migrated from localStorage to MongoDB with Express.js backend.

## Migration Summary

This project has been successfully migrated from a localStorage-based data storage to a full MongoDB + Express.js backend architecture.

### What Changed

**Before**: All data was stored in the browser's localStorage
**After**: Complete REST API backend with MongoDB database

### Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Authentication**: JWT-based authentication with bcrypt password hashing

## Project Structure

```
project/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   ├── contexts/               # React contexts (Auth, Theme)
│   ├── pages/                  # Page components
│   ├── services/              # API service layer
│   │   └── api.ts            # Centralized API client
│   └── utils/                 # Utility functions
│
├── server/                      # Backend Express.js application
│   ├── config/                # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Auth middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   └── index.ts               # Server entry point
│
├── scripts/                     # Utility scripts
│   └── migrate-data.cjs       # Database migration script
│
└── API_DOCUMENTATION.md         # Complete API documentation
```

## Database Models

The following Mongoose schemas were created:

1. **User** - User accounts (patients, therapists, admins)
2. **Booking** - Therapy session bookings
3. **MoodEntry** - Daily mood tracking entries
4. **CBTRecord** - Cognitive Behavioral Therapy records
5. **GratitudeEntry** - Gratitude journal entries
6. **TherapyProgress** - User therapy module progress
7. **TherapySession** - Completed therapy sessions
8. **TherapistService** - Therapist service listings
9. **ChatSession** - Chatbot conversation history
10. **AnalyticsEvent** - Platform analytics events
11. **StreakData** - User activity streaks

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. The MongoDB connection is already configured in the project:
   - Database URI: `mongodb+srv://karthik:karthik123@cluster0.tcvbs.mongodb.net/mental_health2`
   - API URL is set in `.env` file

### Running the Project

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```
The server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

#### Option 2: Build for Production

```bash
npm run build
npm run preview
```

## Database Migration

To populate the database with demo users, run:

```bash
npm run migrate
```

This creates three demo accounts:
- **Patient**: patient@example.com / password
- **Therapist**: therapist@example.com / password
- **Admin**: admin@example.com / password

## API Endpoints

The backend provides the following API routes:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Bookings
- `GET /api/bookings` - Get bookings (with filters)
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Mood Tracking
- `GET /api/mood` - Get mood entries
- `POST /api/mood` - Create mood entry

### Therapy
- `GET /api/therapy/progress/:userId` - Get therapy progress
- `PUT /api/therapy/progress/:userId` - Update therapy progress
- `GET /api/therapy/cbt` - Get CBT records
- `POST /api/therapy/cbt` - Create CBT record
- `GET /api/therapy/gratitude` - Get gratitude entries
- `POST /api/therapy/gratitude` - Create gratitude entry
- `GET /api/therapy/sessions` - Get therapy sessions
- `POST /api/therapy/sessions` - Create therapy session

### Therapist Services
- `GET /api/therapist-services` - Get therapist services
- `POST /api/therapist-services` - Create therapist service
- `PUT /api/therapist-services/:id` - Update therapist service

### Analytics
- `POST /api/analytics/events` - Track analytics event
- `GET /api/analytics/events` - Get analytics events
- `GET /api/analytics/metrics` - Get dashboard metrics

### Chat
- `GET /api/chat/:userId` - Get chat session
- `POST /api/chat/:userId` - Save chat message
- `DELETE /api/chat/:userId` - Clear chat session

### Streak
- `GET /api/streak/:userId` - Get streak data
- `POST /api/streak/:userId` - Update streak

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Authentication

All API endpoints (except register and login) require JWT authentication:

```javascript
Authorization: Bearer <token>
```

Tokens are automatically managed by the frontend API service layer.

## Frontend Integration

The frontend has been updated to use the API service layer (`src/services/api.ts`) instead of localStorage:

```typescript
// Old way (localStorage)
localStorage.setItem('mindcare_user', JSON.stringify(user));

// New way (API)
import { api } from './services/api';
const user = await api.users.getById(userId);
```

## Key Features

- ✅ JWT-based authentication with bcrypt password hashing
- ✅ Complete CRUD operations for all data models
- ✅ Role-based access control (Patient, Therapist, Admin)
- ✅ Mood tracking and analytics
- ✅ Therapy module progress tracking
- ✅ Booking and appointment management
- ✅ Chat bot with conversation history
- ✅ Activity streak tracking
- ✅ Platform analytics and metrics

## Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hot Toast
- Lucide React (icons)
- Recharts (charts)

**Backend:**
- Express.js
- TypeScript
- Mongoose (MongoDB ODM)
- JWT (authentication)
- bcryptjs (password hashing)
- CORS

## Development

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run server` - Start backend server with hot reload
- `npm run server:build` - Build backend TypeScript
- `npm run migrate` - Run database migration
- `npm run lint` - Run ESLint

### Environment Variables

The following environment variables are configured in `.env`:

```
VITE_SUPABASE_URL=https://yzvhcarfoflkecznizsu.supabase.co
VITE_SUPABASE_ANON_KEY=<anon_key>
VITE_API_URL=http://localhost:5000/api
```

## Migration Details

### Data Flow Changes

**Before (localStorage):**
```
Component → localStorage.setItem() → Browser Storage
```

**After (MongoDB + Express):**
```
Component → API Service → Express Route → Controller → Mongoose Model → MongoDB
```

### Authentication Flow

**Before:**
- Email/password checked against localStorage
- User object stored in localStorage

**After:**
- Email/password sent to `/api/auth/login`
- Password verified with bcrypt
- JWT token returned and stored
- Token sent with all subsequent requests

### Benefits of Migration

1. **Data Persistence**: Data survives browser cache clearing
2. **Multi-Device Access**: Access data from any device
3. **Security**: Passwords are hashed, tokens expire
4. **Scalability**: Can handle multiple users
5. **Data Integrity**: Database transactions and validation
6. **Analytics**: Server-side analytics and reporting
7. **Backup**: Database backups and recovery

## Troubleshooting

### Server won't start
- Make sure MongoDB connection string is correct
- Check if port 5000 is available
- Run `npm install` to ensure all dependencies are installed

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check VITE_API_URL in `.env` file
- Check browser console for CORS errors

### Database connection issues
- Verify MongoDB Atlas IP whitelist includes your IP
- Check MongoDB connection string credentials
- Ensure network/firewall allows MongoDB connections

## License

Private project for educational purposes.
