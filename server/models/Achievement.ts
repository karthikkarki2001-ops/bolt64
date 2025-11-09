import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  userId: string;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: Date;
    category: string;
  }[];
  stats: {
    totalSessions: number;
    totalMinutes: number;
    streakDays: number;
    modulesCompleted: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true, index: true },
  achievements: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    unlockedAt: { type: Date, required: true },
    category: { type: String, required: true }
  }],
  stats: {
    totalSessions: { type: Number, default: 0 },
    totalMinutes: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    modulesCompleted: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
