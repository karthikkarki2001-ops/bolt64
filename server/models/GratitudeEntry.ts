import mongoose, { Schema, Document } from 'mongoose';

export interface IGratitudeEntry extends Document {
  userId: string;
  date: string;
  entries: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GratitudeEntrySchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    date: { type: String, required: true },
    entries: [{ type: String, required: true }]
  },
  { timestamps: true }
);

GratitudeEntrySchema.index({ userId: 1, date: 1 });

export default mongoose.model<IGratitudeEntry>('GratitudeEntry', GratitudeEntrySchema);
