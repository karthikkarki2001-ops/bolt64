// Centralized Mock Data Service for Frontend Development
// This service provides test data that updates live across all pages

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'therapist' | 'admin';
  status?: 'pending' | 'approved' | 'rejected' | 'active';
  profilePicture?: string;
  age?: number;
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  specialization?: string;
  experience?: string;
  hourlyRate?: number;
  licenseNumber?: string;
  phone?: string;
  bio?: string;
  verified?: boolean;
  createdAt?: string;
}

export interface MockTherapistService {
  id: string;
  therapistId: string;
  therapistName: string;
  profilePicture?: string;
  qualification: string;
  experience: string;
  chargesPerSession: number;
  specialization: string[];
  bio: string;
  languages: string[];
  availability: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

export interface MockBooking {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  status: 'pending_confirmation' | 'confirmed' | 'completed' | 'cancelled';
  amount: string;
  createdAt: string;
}

export interface MockMoodEntry {
  id: string;
  userId: string;
  mood: string;
  intensity: number;
  notes?: string;
  date: string;
}

export interface MockCBTRecord {
  id: string;
  userId: string;
  situation: string;
  thoughts: string;
  emotions?: string;
  behaviors?: string;
  alternativeThoughts?: string;
  createdAt: string;
}

export interface MockGratitudeEntry {
  id: string;
  userId: string;
  entry: string;
  createdAt: string;
}

// Event name for cross-component updates
const UPDATE_EVENT = 'mockdata-updated';

class MockDataService {
  private storageKey = {
    users: 'mindcare_mock_users',
    services: 'mindcare_therapist_services',
    bookings: 'mindcare_mock_bookings',
    mood: 'mindcare_mock_mood',
    cbt: 'mindcare_mock_cbt',
    gratitude: 'mindcare_mock_gratitude'
  };

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default users if none exist
    if (!localStorage.getItem(this.storageKey.users)) {
      const defaultUsers: MockUser[] = [
        {
          id: 'test-patient-123',
          email: 'patient@example.com',
          name: 'John Doe',
          role: 'patient',
          age: 28,
          emergencyContactEmail: 'emergency@example.com',
          emergencyContactRelation: 'parent',
          verified: true,
          status: 'active',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'test-therapist-456',
          email: 'therapist@example.com',
          name: 'Dr. Sarah Smith',
          role: 'therapist',
          specialization: 'Cognitive Behavioral Therapy',
          hourlyRate: 120,
          licenseNumber: 'LIC123456',
          experience: '8 years',
          phone: '+1 (555) 234-5678',
          bio: 'Experienced therapist specializing in CBT with a passion for helping patients overcome anxiety and depression.',
          verified: true,
          status: 'active',
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'test-admin-789',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          verified: true,
          status: 'active',
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(this.storageKey.users, JSON.stringify(defaultUsers));
    }

    // Initialize default bookings if none exist
    if (!localStorage.getItem(this.storageKey.bookings)) {
      const defaultBookings: MockBooking[] = [
        {
          id: 'booking-1',
          patientId: 'test-patient-123',
          patientName: 'John Doe',
          therapistId: 'test-therapist-456',
          therapistName: 'Dr. Sarah Smith',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          time: '10:00 AM',
          status: 'completed',
          amount: '₹120',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'booking-2',
          patientId: 'test-patient-123',
          patientName: 'John Doe',
          therapistId: 'test-therapist-456',
          therapistName: 'Dr. Sarah Smith',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          time: '2:00 PM',
          status: 'completed',
          amount: '₹120',
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(this.storageKey.bookings, JSON.stringify(defaultBookings));
    }

    // Initialize mood entries
    if (!localStorage.getItem(this.storageKey.mood)) {
      const defaultMood: MockMoodEntry[] = [
        {
          id: 'mood-1',
          userId: 'test-patient-123',
          mood: 'happy',
          intensity: 8,
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'mood-2',
          userId: 'test-patient-123',
          mood: 'neutral',
          intensity: 5,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(this.storageKey.mood, JSON.stringify(defaultMood));
    }

    // Initialize CBT records
    if (!localStorage.getItem(this.storageKey.cbt)) {
      const defaultCBT: MockCBTRecord[] = [
        {
          id: 'cbt-1',
          userId: 'test-patient-123',
          situation: 'Work presentation',
          thoughts: 'I will fail and everyone will judge me',
          emotions: 'Anxious',
          behaviors: 'Avoided eye contact',
          alternativeThoughts: 'I am prepared and capable',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(this.storageKey.cbt, JSON.stringify(defaultCBT));
    }

    // Initialize gratitude entries
    if (!localStorage.getItem(this.storageKey.gratitude)) {
      const defaultGratitude: MockGratitudeEntry[] = [
        {
          id: 'gratitude-1',
          userId: 'test-patient-123',
          entry: 'Grateful for supportive friends and family',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem(this.storageKey.gratitude, JSON.stringify(defaultGratitude));
    }
  }

  private emit() {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }

  // Users
  getAllUsers(): MockUser[] {
    return JSON.parse(localStorage.getItem(this.storageKey.users) || '[]');
  }

  // Therapist Services
  getAllServices(): MockTherapistService[] {
    return JSON.parse(localStorage.getItem(this.storageKey.services) || '[]');
  }

  getApprovedServices(): MockTherapistService[] {
    return this.getAllServices().filter(s => s.status === 'approved');
  }

  getPendingServices(): MockTherapistService[] {
    return this.getAllServices().filter(s => s.status === 'pending');
  }

  addService(service: MockTherapistService): void {
    const services = this.getAllServices();
    services.push(service);
    localStorage.setItem(this.storageKey.services, JSON.stringify(services));
    this.emit();
  }

  updateService(id: string, updates: Partial<MockTherapistService>): void {
    const services = this.getAllServices();
    const updatedServices = services.map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    localStorage.setItem(this.storageKey.services, JSON.stringify(updatedServices));
    this.emit();
  }

  approveService(id: string): void {
    this.updateService(id, {
      status: 'approved',
      approvedAt: new Date().toISOString()
    });
  }

  rejectService(id: string): void {
    this.updateService(id, {
      status: 'rejected',
      rejectedAt: new Date().toISOString()
    });
  }

  // Bookings
  getAllBookings(): MockBooking[] {
    return JSON.parse(localStorage.getItem(this.storageKey.bookings) || '[]');
  }

  getBookingsByUser(userId: string): MockBooking[] {
    return this.getAllBookings().filter(b =>
      b.patientId === userId || b.therapistId === userId
    );
  }

  getBookingsByTherapist(therapistId: string): MockBooking[] {
    return this.getAllBookings().filter(b => b.therapistId === therapistId);
  }

  getBookingsByPatient(patientId: string): MockBooking[] {
    return this.getAllBookings().filter(b => b.patientId === patientId);
  }

  addBooking(booking: MockBooking): void {
    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(this.storageKey.bookings, JSON.stringify(bookings));
    this.emit();
  }

  updateBooking(id: string, updates: Partial<MockBooking>): void {
    const bookings = this.getAllBookings();
    const updatedBookings = bookings.map(b =>
      b.id === id ? { ...b, ...updates } : b
    );
    localStorage.setItem(this.storageKey.bookings, JSON.stringify(updatedBookings));
    this.emit();
  }

  deleteBooking(id: string): void {
    const bookings = this.getAllBookings();
    const filteredBookings = bookings.filter(b => b.id !== id);
    localStorage.setItem(this.storageKey.bookings, JSON.stringify(filteredBookings));
    this.emit();
  }

  // Mood Entries
  getAllMoodEntries(): MockMoodEntry[] {
    return JSON.parse(localStorage.getItem(this.storageKey.mood) || '[]');
  }

  getMoodEntriesByUser(userId: string): MockMoodEntry[] {
    return this.getAllMoodEntries().filter(m => m.userId === userId);
  }

  addMoodEntry(entry: MockMoodEntry): void {
    const entries = this.getAllMoodEntries();
    entries.push(entry);
    localStorage.setItem(this.storageKey.mood, JSON.stringify(entries));
    this.emit();
  }

  // CBT Records
  getAllCBTRecords(): MockCBTRecord[] {
    return JSON.parse(localStorage.getItem(this.storageKey.cbt) || '[]');
  }

  getCBTRecordsByUser(userId: string): MockCBTRecord[] {
    return this.getAllCBTRecords().filter(c => c.userId === userId);
  }

  addCBTRecord(record: MockCBTRecord): void {
    const records = this.getAllCBTRecords();
    records.push(record);
    localStorage.setItem(this.storageKey.cbt, JSON.stringify(records));
    this.emit();
  }

  // Gratitude Entries
  getAllGratitudeEntries(): MockGratitudeEntry[] {
    return JSON.parse(localStorage.getItem(this.storageKey.gratitude) || '[]');
  }

  getGratitudeEntriesByUser(userId: string): MockGratitudeEntry[] {
    return this.getAllGratitudeEntries().filter(g => g.userId === userId);
  }

  addGratitudeEntry(entry: MockGratitudeEntry): void {
    const entries = this.getAllGratitudeEntries();
    entries.push(entry);
    localStorage.setItem(this.storageKey.gratitude, JSON.stringify(entries));
    this.emit();
  }

  // Event Listener
  onUpdate(callback: () => void): () => void {
    window.addEventListener(UPDATE_EVENT, callback);
    return () => window.removeEventListener(UPDATE_EVENT, callback);
  }

  // Clear all data (for testing)
  clearAll(): void {
    Object.values(this.storageKey).forEach(key => {
      localStorage.removeItem(key);
    });
    this.initializeDefaultData();
    this.emit();
  }
}

export const mockDataService = new MockDataService();
