import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapyContent extends Document {
  therapyId: string;
  therapyType: string;
  contentData: any;
  version: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TherapyContentSchema: Schema = new Schema({
  therapyId: { type: String, required: true, index: true },
  therapyType: { type: String, required: true },
  contentData: { type: Schema.Types.Mixed, required: true },
  version: { type: Number, default: 1 },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true
});

TherapyContentSchema.index({ therapyId: 1, version: -1 });

export default mongoose.model<ITherapyContent>('TherapyContent', TherapyContentSchema);
