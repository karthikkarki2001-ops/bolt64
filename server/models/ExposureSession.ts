import mongoose, { Schema, Document } from 'mongoose';

export interface IExposureSession extends Document {
  userId: string;
  sessionDate: Date;
  exposureType: string;
  level: number;
  duration: number;
  anxietyBefore: number;
  anxietyDuring: number;
  anxietyAfter: number;
  notes?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExposureSessionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  sessionDate: { type: Date, required: true },
  exposureType: { type: String, required: true },
  level: { type: Number, required: true },
  duration: { type: Number },
  anxietyBefore: { type: Number, min: 0, max: 10 },
  anxietyDuring: { type: Number, min: 0, max: 10 },
  anxietyAfter: { type: Number, min: 0, max: 10 },
  notes: { type: String },
  completed: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IExposureSession>('ExposureSession', ExposureSessionSchema);
