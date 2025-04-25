// import { Schema, model, models } from 'mongoose';

// const JobSchema = new Schema(
//   {
//     work_type: String,
//     work_days: String,
//     work_hours: String,
//     salary: String,
//     language: String,
//     visa_type: String,
//     contact: String,
//     creator: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Agar allaqachon model bo‘lsa, undan foydalanamiz
// const Job = models.Job || model('Job', JobSchema);

// // export default Job;

import { Document, Schema, model, models } from "mongoose";

interface Job extends Document {
  work_type: string;
  work_days: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  creator: string;
  createdAt: Date;
}

const JobSchema = new Schema<Job>(
  {
    work_type: String,
    work_days: String,
    work_hours: String,
    salary: String,
    language: String,
    visa_type: String,
    contact: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model<Job>("Job", JobSchema);

export default Job;
