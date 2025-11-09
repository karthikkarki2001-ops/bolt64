import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'therapist' | 'admin';
  status?: 'pending' | 'approved' | 'rejected';
  profilePicture?: string;
  profilePhotoUrl?: string;
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  age?: number;
  specialization?: string;
  experience?: string;
  location?: string;
  hourlyRate?: number;
  licenseNumber?: string;
  verified?: boolean;
  phone?: string;
  bio?: string;
  availability?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
