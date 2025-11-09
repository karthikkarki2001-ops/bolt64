import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  amount?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    therapistId: { type: String, required: true },
    therapistName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['confirmed', 'completed', 'cancelled'], default: 'confirmed' },
    meetingLink: { type: String },
    notes: { type: String },
    amount: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
