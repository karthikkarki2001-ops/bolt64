# MindCare API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Register User
```
POST /auth/register
Body: {
  email: string,
  password: string,
  name: string,
  role: 'patient' | 'therapist',
  ...otherFields
}
Response: { success: true, token: string, user: User }
```

#### Login
```
POST /auth/login
Body: {
  email: string,
  password: string,
  role?: string
}
Response: { success: true, token: string, user: User }
```

### Users

#### Get All Users
```
GET /users
Response: User[]
```

#### Get User By ID
```
GET /users/:id
Response: User
```

#### Update User
```
PUT /users/:id
Body: Partial<User>
Response: User
```

#### Delete User
```
DELETE /users/:id
Response: { message: string }
```

### Bookings

#### Get Bookings
```
GET /bookings?userId=<id>&therapistId=<id>
Response: Booking[]
```

#### Create Booking
```
POST /bookings
Body: BookingData
Response: Booking
```

#### Update Booking
```
PUT /bookings/:id
Body: Partial<BookingData>
Response: Booking
```

#### Delete Booking
```
DELETE /bookings/:id
Response: { message: string }
```

### Mood Tracking

#### Get Mood Entries
```
GET /mood?userId=<id>
Response: MoodEntry[]
```

#### Create Mood Entry
```
POST /mood
Body: { userId: string, mood: number, date: string, notes?: string }
Response: MoodEntry
```

### Therapy

#### Get Therapy Progress
```
GET /therapy/progress/:userId
Response: TherapyProgress
```

#### Update Therapy Progress
```
PUT /therapy/progress/:userId
Body: { moduleData: object }
Response: TherapyProgress
```

#### Get CBT Records
```
GET /therapy/cbt?userId=<id>
Response: CBTRecord[]
```

#### Create CBT Record
```
POST /therapy/cbt
Body: CBTRecordData
Response: CBTRecord
```

#### Get Gratitude Entries
```
GET /therapy/gratitude?userId=<id>
Response: GratitudeEntry[]
```

#### Create Gratitude Entry
```
POST /therapy/gratitude
Body: { userId: string, date: string, entries: string[] }
Response: GratitudeEntry
```

#### Get Therapy Sessions
```
GET /therapy/sessions?userId=<id>&moduleName=<name>
Response: TherapySession[]
```

#### Create Therapy Session
```
POST /therapy/sessions
Body: { userId: string, moduleName: string, sessionData: object }
Response: TherapySession
```

### Therapist Services

#### Get Therapist Services
```
GET /therapist-services?status=<status>
Response: TherapistService[]
```

#### Create Therapist Service
```
POST /therapist-services
Body: TherapistServiceData
Response: TherapistService
```

#### Update Therapist Service
```
PUT /therapist-services/:id
Body: Partial<TherapistServiceData>
Response: TherapistService
```

### Analytics

#### Track Event
```
POST /analytics/events
Body: { type: string, userId?: string, data: object }
Response: AnalyticsEvent
```

#### Get Events
```
GET /analytics/events?type=<type>&userId=<id>&startDate=<date>&endDate=<date>
Response: AnalyticsEvent[]
```

#### Get Dashboard Metrics
```
GET /analytics/metrics
Response: DashboardMetrics
```

### Chat

#### Get Chat Session
```
GET /chat/:userId
Response: ChatSession
```

#### Save Chat Message
```
POST /chat/:userId
Body: { message: { type: 'bot' | 'user', content: string } }
Response: ChatSession
```

#### Clear Chat Session
```
DELETE /chat/:userId
Response: { message: string }
```

### Streak

#### Get Streak Data
```
GET /streak/:userId
Response: StreakData
```

#### Update Streak
```
POST /streak/:userId
Response: StreakData
```

## Data Models

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'therapist' | 'admin';
  status?: 'pending' | 'approved' | 'rejected';
  verified?: boolean;
  // ... other fields
}
```

### Booking
```typescript
{
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  // ... other fields
}
```

## Running the Server

1. Install dependencies:
```bash
npm install
```

2. Run data migration (creates demo users):
```bash
npm run migrate
```

3. Start the server:
```bash
npm run server
```

4. Start the frontend:
```bash
npm run dev
```

## Demo Credentials

- **Patient**: patient@example.com / password
- **Therapist**: therapist@example.com / password
- **Admin**: admin@example.com / password
