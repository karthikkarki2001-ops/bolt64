# Demo Accounts

Your MindCare application comes with 3 pre-configured demo accounts for testing:

## Login Credentials

### 👤 Patient Account
- **Email:** `patient@example.com`
- **Password:** `password`
- **Role:** Patient
- **Name:** John Doe
- **Features:** Access to therapy modules, mood tracking, booking appointments

### 🩺 Therapist Account
- **Email:** `therapist@example.com`
- **Password:** `password`
- **Role:** Therapist
- **Name:** Dr. Sarah Smith
- **Specialization:** Cognitive Behavioral Therapy
- **Features:** View patients, manage appointments, access reports

### 👨‍💼 Admin Account
- **Email:** `admin@example.com`
- **Password:** `password`
- **Role:** Admin
- **Name:** Admin User
- **Features:** Full system access, user management, analytics dashboard

## How to Load Demo Accounts

After setting up your MongoDB connection in `.env`, run:

```bash
npm run migrate
```

This will:
1. Clear any existing data (if needed)
2. Create the 3 demo accounts with hashed passwords
3. Set up the therapist service for Dr. Sarah Smith
4. Make all accounts immediately available for login

## Notes

- Demo accounts are perfect for frontend development and testing
- Passwords are securely hashed with bcrypt
- The therapist account is pre-approved and has full availability
- All accounts have `verified: true` status
- You can create additional accounts through the registration flow
