# MindCare Setup Instructions

Follow these steps to get your MindCare application running:

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Environment Variables

Open the `.env` file and replace the MongoDB connection string with your own:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mindcare?retryWrites=true&w=majority
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your actual password
7. Replace `<database>` with `mindcare`

## 3. Load Demo Accounts

Run the migration script to create 3 demo accounts:

```bash
npm run migrate
```

You should see:
```
✅ MongoDB Connected
Created user: patient@example.com
Created user: therapist@example.com
Created therapist service for: Dr. Sarah Smith
Created user: admin@example.com

Migration completed successfully!
Created 3 users

Demo credentials:
Patient: patient@example.com / password
Therapist: therapist@example.com / password
Admin: admin@example.com / password
```

## 4. Start the Backend Server

In **Terminal 1**, start the Express backend:

```bash
npm run server
```

You should see:
```
✅ MongoDB Connected: mindcare
🚀 Server running on port 5000
```

## 5. Start the Frontend

In **Terminal 2**, start the React frontend:

```bash
npm run dev
```

You should see:
```
VITE v5.4.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 6. Login with Demo Accounts

Open your browser to `http://localhost:5173/` and login with:

- **Patient:** `patient@example.com` / `password`
- **Therapist:** `therapist@example.com` / `password`
- **Admin:** `admin@example.com` / `password`

## Troubleshooting

### "Failed to fetch" error
- Make sure the backend server is running on port 5000
- Check that `VITE_API_URL=http://localhost:5000/api` is set in `.env`

### "MongoDB connection failed"
- Verify your MongoDB URI is correct in `.env`
- Make sure your MongoDB cluster is active
- Check that your IP address is whitelisted in MongoDB Atlas (or allow all: 0.0.0.0/0)

### "Port 5000 already in use"
- Change `PORT=5000` to another port like `PORT=5001` in `.env`
- Update `VITE_API_URL` to match the new port

## Project Structure

```
mindcare/
├── server/           # Express backend (MongoDB)
├── src/             # React frontend
├── .env             # Environment variables
└── scripts/         # Database migration scripts
```

## Available Scripts

- `npm run dev` - Start frontend dev server
- `npm run server` - Start backend server
- `npm run build` - Build for production
- `npm run migrate` - Load demo accounts into database
