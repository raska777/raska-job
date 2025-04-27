// import { Schema, model, models, Document } from 'mongoose';

// // Yangi tipni aniqlash
// interface IJob extends Document {
//   jobname: string;
//   location: string;
//   work_type: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   work_days?: string;
//   posted_date?: string;
//   createdAt?: string;
// }

// // Job schema
// const JobSchema = new Schema<IJob>(
//   {
//     jobname: String,
//     location: String,
//     work_type: String,
//     work_hours: String,
//     salary: String,
//     language: String,
//     visa_type: String,
//     contact: String,
//     work_days: String,
//     posted_date: String,
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Agar model allaqachon mavjud bo‘lsa, undan foydalanamiz
// const Job = models.Job || model<IJob>('Job', JobSchema);

// export default Job;
