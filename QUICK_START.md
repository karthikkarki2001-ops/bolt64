# 🚀 Quick Start Guide

## Run the Project in 4 Simple Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Seed the Database
```bash
npm run seed
```

Wait for:
```
Database seeded successfully!
Test Accounts:
Patient: patient@example.com / password
Therapist: therapist@example.com / password
Admin: admin@example.com / password
```

### 3️⃣ Start Backend (Terminal 1)
```bash
npm run server
```

Wait for:
```
Server is running on port 5000
MongoDB connected successfully
```

### 4️⃣ Start Frontend (Terminal 2)
```bash
npm run dev
```

Wait for:
```
Local: http://localhost:5173/
```

## 🎉 Done! Open Browser

Navigate to: **http://localhost:5173**

Login with:
- **Email:** patient@example.com
- **Password:** password

---

## 📚 Full Documentation

- **MONGODB_SETUP_GUIDE.md** - Complete setup instructions
- **MONGODB_MIGRATION_COMPLETE.md** - Migration details
- **API_DOCUMENTATION.md** - API endpoints reference

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB connection in `/server/config/database.ts`

**Frontend can't connect?**
- Ensure backend is running on port 5000
- Test: `curl http://localhost:5000/api/health`

**Login fails?**
- Run `npm run seed` first
- Use exact credentials: `patient@example.com` / `password`

---

## 🎯 Key Endpoints

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

**Happy Coding! 🚀**
