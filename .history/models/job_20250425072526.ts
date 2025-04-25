import { Schema, model, models, Document } from "mongoose";

// Job schema uchun interfeys
interface Job extends Document {
  work_type: string;
  work_days: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  creator: string;  // creator maydoni ObjectId sifatida saqlanadi
  createdAt: Date;
}

// JobSchema
const JobSchema = new Schema<Job>(
  {
    work_type: { type: String, required: true },
    work_days: { type: String, required: true },
    work_hours: { type: String, required: true },
    salary: { type: String, required: true },
    language: { type: String, required: true },
    visa_type: { type: String, required: true },
    contact: { type: String, required: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User", // User modeliga bog'lanadi
      required: true,
    },
  },
  {
    timestamps: true, // createdAt va updatedAt maydonlari avtomatik qo'shiladi
  }
);

// Agar model allaqachon mavjud bo'lsa, undan foydalanamiz
const Job = models.Job || model<Job>("Job", JobSchema);

export default Job;
