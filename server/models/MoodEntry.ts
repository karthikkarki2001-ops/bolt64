import mongoose, { Schema, Document } from 'mongoose';

export interface IMoodEntry extends Document {
  userId: string;
  mood: number;
  date: string;
  notes?: string;
  activities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MoodEntrySchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    mood: { type: Number, required: true, min: 1, max: 10 },
    date: { type: String, required: true },
    notes: { type: String },
    activities: [{ type: String }]
  },
  { timestamps: true }
);

MoodEntrySchema.index({ userId: 1, date: 1 });

export default mongoose.model<IMoodEntry>('MoodEntry', MoodEntrySchema);
