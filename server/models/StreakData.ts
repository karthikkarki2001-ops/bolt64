import mongoose, { Schema, Document } from 'mongoose';

export interface IStreakData extends Document {
  userId: string;
  currentStreak: number;
  lastActivityDate: string;
  longestStreak: number;
  totalActivities: number;
  createdAt: Date;
  updatedAt: Date;
}

const StreakDataSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    currentStreak: { type: Number, default: 0 },
    lastActivityDate: { type: String, default: '' },
    longestStreak: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<IStreakData>('StreakData', StreakDataSchema);
