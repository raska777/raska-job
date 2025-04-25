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

// export default Job;
import { Schema, model, models } from 'mongoose';

// Yangi ish e'lonining schema-si
const JobSchema = new Schema(
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
      ref: 'User',
    },
  },
  {
    timestamps: true,  // Avtomatik createdAt va updatedAt maydonlarini yaratadi
  }
);

// Agar model mavjud bo'lsa, undan foydalanamiz
const Job = models.Job || model('Job', JobSchema);

export default Job;
