import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapistService extends Document {
  therapistId: string;
  therapistName: string;
  therapistEmail: string;
  specialization: string;
  hourlyRate: number;
  licenseNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  availability?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TherapistServiceSchema: Schema = new Schema(
  {
    therapistId: { type: String, required: true, unique: true },
    therapistName: { type: String, required: true },
    therapistEmail: { type: String, required: true },
    specialization: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    licenseNumber: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    availability: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model<ITherapistService>('TherapistService', TherapistServiceSchema);
