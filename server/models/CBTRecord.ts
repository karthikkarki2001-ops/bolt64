import mongoose, { Schema, Document } from 'mongoose';

export interface ICBTRecord extends Document {
  userId: string;
  date: string;
  situation: string;
  thoughts: string;
  emotions: string;
  behaviors: string;
  alternativeThoughts?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CBTRecordSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    date: { type: String, required: true },
    situation: { type: String, required: true },
    thoughts: { type: String, required: true },
    emotions: { type: String, required: true },
    behaviors: { type: String, required: true },
    alternativeThoughts: { type: String }
  },
  { timestamps: true }
);

CBTRecordSchema.index({ userId: 1, date: 1 });

export default mongoose.model<ICBTRecord>('CBTRecord', CBTRecordSchema);
