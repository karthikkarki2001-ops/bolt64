import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  type: string;
  userId?: string;
  therapistId?: string;
  timestamp: Date;
  data: any;
  createdAt: Date;
}

const AnalyticsEventSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    userId: { type: String },
    therapistId: { type: String },
    timestamp: { type: Date, default: Date.now },
    data: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

AnalyticsEventSchema.index({ type: 1, timestamp: -1 });
AnalyticsEventSchema.index({ userId: 1 });

export default mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
