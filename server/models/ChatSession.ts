import mongoose, { Schema, Document } from 'mongoose';

export interface IChatSession extends Document {
  userId: string;
  messages: Array<{
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSessionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    messages: [{
      type: { type: String, enum: ['bot', 'user'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

ChatSessionSchema.index({ userId: 1 });

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
