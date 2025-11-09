import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapyProgress extends Document {
  userId: string;
  moduleData: any;
  createdAt: Date;
  updatedAt: Date;
}

const TherapyProgressSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    moduleData: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model<ITherapyProgress>('TherapyProgress', TherapyProgressSchema);
