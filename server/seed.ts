import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';
import TherapyModule from './models/TherapyModule';
import Achievement from './models/Achievement';

const MONGODB_URI = 'mongodb+srv://karthik:karthik123@cluster0.tcvbs.mongodb.net/mental_health2';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await TherapyModule.deleteMany({});
    await Achievement.deleteMany({});

    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('password', 10);

    const users = await User.insertMany([
      {
        email: 'patient@example.com',
        password: hashedPassword,
        name: 'John Doe',
        role: 'patient',
        status: 'approved',
        age: 28,
        emergencyContactEmail: 'emergency@example.com',
        emergencyContactRelation: 'parent',
        verified: true
      },
      {
        email: 'therapist@example.com',
        password: hashedPassword,
        name: 'Dr. Sarah Smith',
        role: 'therapist',
        status: 'approved',
        specialization: 'Cognitive Behavioral Therapy',
        hourlyRate: 120,
        licenseNumber: 'LIC123456',
        experience: '8 years',
        phone: '+1 (555) 234-5678',
        bio: 'Experienced therapist specializing in CBT with a passion for helping patients overcome anxiety and depression.',
        verified: true
      },
      {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        status: 'approved',
        verified: true
      }
    ]);

    console.log(`Created ${users.length} users`);

    console.log('Seeding therapy modules...');
    const therapyModules = await TherapyModule.insertMany([
      {
        title: 'CBT Thought Records',
        description: 'Cognitive Behavioral Therapy techniques to identify and change negative thought patterns',
        category: 'CBT',
        icon: 'BookOpen',
        color: 'from-purple-500 to-pink-500',
        duration: '15-20 min',
        difficulty: 'Beginner',
        sessions: 12,
        tags: ['cbt', 'cognitive', 'thoughts'],
        status: 'Active'
      },
      {
        title: 'Mindfulness & Breathing',
        description: 'Evidence-based breathing techniques for anxiety relief and mental clarity',
        category: 'Mindfulness',
        icon: 'Brain',
        color: 'from-blue-500 to-cyan-500',
        duration: '10-30 min',
        difficulty: 'Beginner',
        sessions: 15,
        tags: ['mindfulness', 'breathing', 'relaxation'],
        status: 'Active'
      },
      {
        title: 'Stress Management',
        description: 'Learn effective coping strategies for managing daily stress and pressure',
        category: 'Stress',
        icon: 'Target',
        color: 'from-teal-500 to-green-500',
        duration: '15-20 min',
        difficulty: 'Beginner',
        sessions: 8,
        tags: ['stress', 'coping', 'management'],
        status: 'Active'
      },
      {
        title: 'Gratitude Journal',
        description: 'Daily gratitude practices to cultivate positivity and appreciation',
        category: 'Positive Psychology',
        icon: 'Heart',
        color: 'from-green-500 to-teal-500',
        duration: '5-10 min',
        difficulty: 'Beginner',
        sessions: 21,
        tags: ['gratitude', 'journal', 'positivity'],
        status: 'Active'
      },
      {
        title: 'Relaxation Music',
        description: 'Curated audio library for relaxation and focus',
        category: 'Music Therapy',
        icon: 'Music',
        color: 'from-purple-500 to-blue-500',
        duration: 'Variable',
        difficulty: 'Beginner',
        sessions: 20,
        tags: ['music', 'relaxation', 'audio'],
        status: 'Active'
      },
      {
        title: 'Tetris Therapy',
        description: 'Gamified stress relief and cognitive enhancement through mindful puzzle-solving',
        category: 'Game Therapy',
        icon: 'Gamepad2',
        color: 'from-cyan-500 to-blue-500',
        duration: '10-15 min',
        difficulty: 'Beginner',
        sessions: 12,
        tags: ['game', 'tetris', 'cognitive'],
        status: 'Active'
      },
      {
        title: 'Art & Color Therapy',
        description: 'Creative expression through digital art and therapeutic coloring',
        category: 'Art Therapy',
        icon: 'Palette',
        color: 'from-pink-500 to-purple-500',
        duration: '20-30 min',
        difficulty: 'Beginner',
        sessions: 10,
        tags: ['art', 'color', 'creative'],
        status: 'Active'
      },
      {
        title: 'Exposure Therapy',
        description: 'Gradual exposure techniques for anxiety and phobias with safety protocols',
        category: 'Exposure',
        icon: 'Eye',
        color: 'from-orange-500 to-red-500',
        duration: '30-45 min',
        difficulty: 'Advanced',
        sessions: 12,
        tags: ['exposure', 'anxiety', 'phobia'],
        status: 'Active'
      },
      {
        title: 'Video Therapy',
        description: 'Professional therapeutic video content with licensed therapists',
        category: 'Video Therapy',
        icon: 'Play',
        color: 'from-blue-500 to-indigo-500',
        duration: '20-40 min',
        difficulty: 'Intermediate',
        sessions: 16,
        tags: ['video', 'guided', 'therapy'],
        status: 'Active'
      },
      {
        title: 'Acceptance & Commitment Therapy',
        description: 'ACT principles for psychological flexibility and values-based living',
        category: 'ACT',
        icon: 'Star',
        color: 'from-teal-500 to-cyan-500',
        duration: '25-35 min',
        difficulty: 'Intermediate',
        sessions: 14,
        tags: ['act', 'acceptance', 'mindfulness'],
        status: 'Active'
      }
    ]);

    console.log(`Created ${therapyModules.length} therapy modules`);

    console.log('Seeding achievements...');
    const achievements = await Achievement.insertMany([
      {
        title: 'First Steps',
        description: 'Complete your first therapy session',
        type: 'therapy',
        requirement: 1,
        icon: 'Footprints'
      },
      {
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        type: 'streak',
        requirement: 7,
        icon: 'Flame'
      },
      {
        title: 'Mindful Meditator',
        description: 'Complete 10 mindfulness sessions',
        type: 'therapy',
        requirement: 10,
        icon: 'Brain'
      },
      {
        title: 'Stress Buster',
        description: 'Log 5 days of effective stress management',
        type: 'stress',
        requirement: 5,
        icon: 'Shield'
      },
      {
        title: 'Mood Tracker',
        description: 'Track your mood for 14 consecutive days',
        type: 'mood',
        requirement: 14,
        icon: 'Heart'
      },
      {
        title: 'Therapy Graduate',
        description: 'Complete 3 full therapy modules',
        type: 'therapy',
        requirement: 3,
        icon: 'GraduationCap'
      },
      {
        title: 'Month Champion',
        description: 'Maintain a 30-day streak',
        type: 'streak',
        requirement: 30,
        icon: 'Trophy'
      },
      {
        title: 'Early Bird',
        description: 'Complete 10 morning meditation sessions',
        type: 'therapy',
        requirement: 10,
        icon: 'Sunrise'
      }
    ]);

    console.log(`Created ${achievements.length} achievements`);

    console.log('\nDatabase seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Patient: patient@example.com / password');
    console.log('Therapist: therapist@example.com / password');
    console.log('Admin: admin@example.com / password');

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
