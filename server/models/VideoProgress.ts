import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoProgress extends Document {
  userId: string;
  videoId: string;
  videoTitle: string;
  progress: number;
  completed: boolean;
  lastWatchedAt: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoProgressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  videoTitle: { type: String, required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completed: { type: Boolean, default: false },
  lastWatchedAt: { type: Date, default: Date.now },
  notes: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IVideoProgress>('VideoProgress', VideoProgressSchema);
