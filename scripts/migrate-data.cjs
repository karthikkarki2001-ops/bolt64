const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://karthik:karthik123@cluster0.tcvbs.mongodb.net/mental_health2';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['patient', 'therapist', 'admin'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'] },
  profilePicture: { type: String },
  profilePhotoUrl: { type: String },
  emergencyContactEmail: { type: String },
  emergencyContactRelation: { type: String },
  age: { type: Number },
  specialization: { type: String },
  experience: { type: String },
  location: { type: String },
  hourlyRate: { type: Number },
  licenseNumber: { type: String },
  verified: { type: Boolean, default: false },
  phone: { type: String },
  bio: { type: String },
  availability: [{ type: String }]
}, { timestamps: true });

const TherapistServiceSchema = new mongoose.Schema({
  therapistId: { type: String, required: true, unique: true },
  therapistName: { type: String, required: true },
  therapistEmail: { type: String, required: true },
  specialization: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  licenseNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  availability: [{ type: String }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const TherapistService = mongoose.model('TherapistService', TherapistServiceSchema);

const demoUsers = [
  {
    email: 'patient@example.com',
    password: 'password',
    name: 'John Doe',
    role: 'patient',
    emergencyContactEmail: 'emergency@example.com',
    emergencyContactRelation: 'parent',
    age: 28,
    verified: true
  },
  {
    email: 'therapist@example.com',
    password: 'password',
    name: 'Dr. Sarah Smith',
    role: 'therapist',
    specialization: 'Cognitive Behavioral Therapy',
    hourlyRate: 120,
    licenseNumber: 'LIC123456',
    verified: true,
    experience: '8 years',
    phone: '+1 (555) 234-5678',
    bio: 'Experienced therapist specializing in CBT with a passion for helping patients overcome anxiety and depression.',
    availability: [
      'Monday 9:00 AM', 'Monday 10:00 AM', 'Monday 11:00 AM', 'Monday 12:00 PM',
      'Monday 1:00 PM', 'Monday 2:00 PM', 'Monday 3:00 PM', 'Monday 4:00 PM', 'Monday 5:00 PM',
      'Tuesday 9:00 AM', 'Tuesday 10:00 AM', 'Tuesday 11:00 AM', 'Tuesday 12:00 PM',
      'Tuesday 1:00 PM', 'Tuesday 2:00 PM', 'Tuesday 3:00 PM', 'Tuesday 4:00 PM', 'Tuesday 5:00 PM',
      'Wednesday 9:00 AM', 'Wednesday 10:00 AM', 'Wednesday 11:00 AM', 'Wednesday 12:00 PM',
      'Wednesday 1:00 PM', 'Wednesday 2:00 PM', 'Wednesday 3:00 PM', 'Wednesday 4:00 PM', 'Wednesday 5:00 PM',
      'Thursday 9:00 AM', 'Thursday 10:00 AM', 'Thursday 11:00 AM', 'Thursday 12:00 PM',
      'Thursday 1:00 PM', 'Thursday 2:00 PM', 'Thursday 3:00 PM', 'Thursday 4:00 PM', 'Thursday 5:00 PM',
      'Friday 9:00 AM', 'Friday 10:00 AM', 'Friday 11:00 AM', 'Friday 12:00 PM',
      'Friday 1:00 PM', 'Friday 2:00 PM', 'Friday 3:00 PM', 'Friday 4:00 PM', 'Friday 5:00 PM'
    ]
  },
  {
    email: 'admin@example.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin',
    verified: true
  }
];

async function migrateData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await TherapistService.deleteMany({});

    console.log('Creating demo users...');
    const createdUsers = [];

    for (const userData of demoUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);

      if (user.role === 'therapist') {
        const service = new TherapistService({
          therapistId: user._id.toString(),
          therapistName: user.name,
          therapistEmail: user.email,
          specialization: user.specialization || 'General Therapy',
          hourlyRate: user.hourlyRate || 100,
          licenseNumber: user.licenseNumber || 'LIC000000',
          status: 'approved',
          availability: user.availability
        });
        await service.save();
        console.log(`Created therapist service for: ${user.name}`);
      }
    }

    console.log('\nMigration completed successfully!');
    console.log(`Created ${createdUsers.length} users`);
    console.log('\nDemo credentials:');
    console.log('Patient: patient@example.com / password');
    console.log('Therapist: therapist@example.com / password');
    console.log('Admin: admin@example.com / password');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDisconnected from MongoDB');
  }
}

migrateData();
