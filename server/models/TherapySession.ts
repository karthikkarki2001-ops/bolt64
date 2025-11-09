import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapySession extends Document {
  userId: string;
  moduleName: string;
  sessionData: any;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TherapySessionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    moduleName: { type: String, required: true },
    sessionData: { type: Schema.Types.Mixed },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

TherapySessionSchema.index({ userId: 1, moduleName: 1 });

export default mongoose.model<ITherapySession>('TherapySession', TherapySessionSchema);
