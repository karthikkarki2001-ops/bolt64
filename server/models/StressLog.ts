import mongoose, { Schema, Document } from 'mongoose';

export interface IStressLog extends Document {
  userId: string;
  logDate: Date;
  stressLevel: number;
  techniqueUsed: string;
  duration: number;
  effectiveness: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StressLogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  logDate: { type: Date, required: true },
  stressLevel: { type: Number, required: true, min: 0, max: 10 },
  techniqueUsed: { type: String, required: true },
  duration: { type: Number },
  effectiveness: { type: Number, min: 0, max: 10 },
  notes: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IStressLog>('StressLog', StressLogSchema);
