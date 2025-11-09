# MongoDB Setup Guide - Complete Migration

## ✅ Overview

The MindCare platform has been **completely migrated to MongoDB** with a full Express.js backend. This guide will help you run the project locally in VS Code.

---

## 📦 Project Structure

```
project/
├── server/                    # Express.js Backend
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── models/               # Mongoose models (14 models)
│   ├── controllers/          # API controllers
│   ├── routes/               # API routes
│   ├── middleware/           # Auth middleware
│   ├── index.ts             # Server entry point
│   └── seed.ts              # Database seeding script
├── src/                      # React Frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.ts           # MongoDB API calls
│   ├── contexts/
│   └── utils/
└── package.json
```

---

## 🗄️ MongoDB Models Created

### 1. **User.ts** - User profiles
### 2. **TherapyModule.ts** - Therapy programs
### 3. **TherapyContent.ts** - Module content
### 4. **TherapySession.ts** - Session records
### 5. **TherapyProgress.ts** - Progress tracking
### 6. **Booking.ts** - Appointments
### 7. **TherapistService.ts** - Service listings
### 8. **ChatSession.ts** - Chatbot history
### 9. **StreakData.ts** - Activity streaks
### 10. **MoodEntry.ts** - Mood tracking
### 11. **CBTRecord.ts** - CBT records
### 12. **GratitudeEntry.ts** - Gratitude journal
### 13. **ExposureSession.ts** - Exposure therapy
### 14. **StressLog.ts** - Stress management
### 15. **VideoProgress.ts** - Video progress
### 16. **AnalyticsEvent.ts** - System analytics
### 17. **Achievement.ts** - Achievements

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Seed the Database

Run this to populate MongoDB with default data:

```bash
npm run seed
```

This will create:
- 3 test user accounts
- 10 therapy modules
- 8 achievements

### Step 3: Start the Backend Server

In one terminal:

```bash
npm run server
```

Server will run on: `http://localhost:5000`

### Step 4: Start the Frontend

In another terminal:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔐 Test Accounts

After seeding, you can login with:

### Patient Account
- **Email:** patient@example.com
- **Password:** password

### Therapist Account
- **Email:** therapist@example.com
- **Password:** password

### Admin Account
- **Email:** admin@example.com
- **Password:** password

---

## 🌐 MongoDB Connection

The project connects to MongoDB Atlas:

**Connection String (in `/server/config/database.ts`):**
```typescript
mongodb+srv://karthik:karthik123@cluster0.tcvbs.mongodb.net/mental_health2
```

**Database Name:** `mental_health2`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Therapy Modules
- `GET /api/therapy-modules` - Get all modules
- `GET /api/therapy-modules/:id` - Get module by ID
- `POST /api/therapy-modules` - Create module
- `PUT /api/therapy-modules/:id` - Update module
- `DELETE /api/therapy-modules/:id` - Delete module
- `PUT /api/therapy-modules/:id/toggle` - Toggle status

### Therapy Content
- `GET /api/therapy-contents` - Get all content
- `GET /api/therapy-contents/:id` - Get content by ID
- `POST /api/therapy-contents` - Create content
- `PUT /api/therapy-contents/:id` - Update content
- `DELETE /api/therapy-contents/:id` - Delete content

### Mood Tracking
- `GET /api/mood?userId=xxx` - Get mood entries
- `POST /api/mood` - Create mood entry
- `PUT /api/mood/:id` - Update mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Bookings
- `GET /api/bookings?patientId=xxx` - Get bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Therapist Services
- `GET /api/therapist-services` - Get services
- `POST /api/therapist-services` - Create service
- `PUT /api/therapist-services/:id` - Update service
- `DELETE /api/therapist-services/:id` - Delete service

### Chat
- `GET /api/chat?userId=xxx` - Get chat history
- `POST /api/chat` - Save chat message
- `DELETE /api/chat/:id` - Clear chat

### Streak Data
- `GET /api/streak?userId=xxx` - Get streak data
- `POST /api/streak` - Update streak

### Therapy Sessions
- `GET /api/therapy?userId=xxx` - Get sessions
- `POST /api/therapy` - Create session

### CBT Records
- `GET /api/therapy?userId=xxx&type=cbt` - Get CBT records
- `POST /api/therapy` - Create CBT record

### Gratitude Entries
- `GET /api/therapy?userId=xxx&type=gratitude` - Get entries
- `POST /api/therapy` - Create entry

### Exposure Sessions
- `GET /api/exposure?userId=xxx` - Get sessions
- `POST /api/exposure` - Create session

### Stress Logs
- `GET /api/stress?userId=xxx` - Get logs
- `POST /api/stress` - Create log

### Video Progress
- `GET /api/video-progress?userId=xxx` - Get progress
- `POST /api/video-progress` - Update progress

### Analytics
- `GET /api/analytics` - Get analytics
- `POST /api/analytics` - Track event

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/user/:userId` - Get user achievements
- `POST /api/achievements/user` - Initialize user achievements
- `PUT /api/achievements/user/:id` - Update achievement progress

---

## 🔧 Frontend Configuration

The frontend automatically connects to the MongoDB backend.

**API URL Configuration** (in `/src/services/api.ts`):
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

You can override this by creating a `.env` file in the root:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 💾 Data Flow

### User Registration Flow:
1. User fills registration form
2. Frontend calls `POST /api/auth/register`
3. Backend creates user in MongoDB
4. Backend returns JWT token
5. Frontend stores token and user data
6. User is logged in

### Mood Entry Flow:
1. User fills mood tracker form
2. Frontend calls `POST /api/mood`
3. Backend saves to MongoDB `moodentries` collection
4. Data is immediately available on reload

### Booking Flow:
1. Patient selects therapist and time
2. Frontend calls `POST /api/bookings`
3. Backend saves to MongoDB `bookings` collection
4. Both patient and therapist can view

---

## 🧪 Testing

### 1. Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "MindCare API is running"
}
```

### 2. Test User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@example.com","password":"password"}'
```

### 3. Test Get Therapy Modules

```bash
curl http://localhost:5000/api/therapy-modules
```

---

## 📝 Development Workflow

### Making Backend Changes

1. Edit files in `/server`
2. Server auto-restarts with nodemon
3. Test changes with frontend

### Making Frontend Changes

1. Edit files in `/src`
2. Vite hot-reloads automatically
3. Changes appear instantly

### Adding New API Endpoint

1. Create model in `/server/models/`
2. Create controller in `/server/controllers/`
3. Create routes in `/server/routes/`
4. Add route to `/server/index.ts`
5. Use in frontend via `/src/services/api.ts`

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** MongoDB connection error

**Solution:** Check if MongoDB URI is correct in `/server/config/database.ts`

### Frontend Can't Connect

**Problem:** API calls failing with network error

**Solution:**
1. Ensure backend is running (`npm run server`)
2. Check `http://localhost:5000/api/health`
3. Verify CORS is enabled in `/server/index.ts`

### Seed Script Fails

**Problem:** Duplicate key error

**Solution:** MongoDB already has data. To reset:
```javascript
// In MongoDB Compass or Atlas, drop the database and run seed again
```

---

## 📊 MongoDB Atlas Access

You can view/edit data directly in MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Login with credentials
3. Select `Cluster0`
4. Browse Collections
5. Select database `mental_health2`

Collections you'll see:
- users
- therapymodules
- therapycontents
- moodentries
- bookings
- therapistsservices
- chatsessions
- streakdatas
- cbtrecords
- gratitudeentries
- exposuresessions
- stresslogs
- videoprogresses
- analyticsevents
- achievements

---

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User logs in
2. Backend generates JWT with user ID and role
3. Frontend stores token in localStorage
4. All API requests include token in Authorization header
5. Backend verifies token before processing requests

**Token Format:**
```
Authorization: Bearer <jwt-token>
```

---

## 🎯 Complete Features List

### ✅ Fully Implemented with MongoDB

1. **User Management**
   - Registration
   - Login/Logout
   - Profile updates
   - Role-based access

2. **Mood Tracking**
   - Daily mood entries
   - Historical data
   - Analytics charts

3. **Therapy Modules**
   - 10 pre-seeded modules
   - CRUD operations
   - Status management

4. **Bookings**
   - Create appointments
   - View by patient/therapist
   - Update status

5. **Therapist Services**
   - Service listings
   - Approval workflow

6. **Chat/Chatbot**
   - Message history
   - User sessions

7. **Streak Tracking**
   - Daily activity tracking
   - Longest streak

8. **CBT Records**
   - Thought records
   - Progress tracking

9. **Gratitude Journal**
   - Daily entries
   - Mood correlation

10. **Achievements**
    - Progress tracking
    - Unlocking system

11. **Analytics**
    - Event tracking
    - User metrics

---

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Push code to Git
2. Set environment variables:
   ```
   MONGODB_URI=your_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
3. Deploy backend
4. Note the backend URL

### Frontend Deployment (Vercel/Netlify)

1. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url/api
   ```
2. Build: `npm run build`
3. Deploy `dist` folder

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

## ✨ Next Steps

1. **Run the seed script** to populate data
2. **Start both servers** (backend + frontend)
3. **Login** with test accounts
4. **Test all features** to ensure everything works
5. **Develop new features** as needed

---

## 🎉 Congratulations!

Your MindCare platform is now running with:
- ✅ MongoDB database (cloud-hosted)
- ✅ Express.js RESTful API
- ✅ React frontend
- ✅ JWT authentication
- ✅ 17 data models
- ✅ Complete CRUD operations
- ✅ Seeded test data
- ✅ Ready for local development in VS Code!

**Happy Coding! 🚀**
