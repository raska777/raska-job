// import { MongoClient } from "mongodb";

// // MongoDB URI va parametrlar
// const uri = process.env.MONGODB_URI as string;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// // Agar MONGODB_URI aniqlanmagan bo‘lsa, xatolikni ko‘rsatamiz
// if (!uri) {
//   throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
// }

// // Global deklaratsiya: globalThis orqali _mongoClientPromise o‘zgaruvchisini e'lon qilamiz
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined; // Bu erda undefined ni qo‘shish kerak, chunki u boshlang‘ichda mavjud bo‘lmasligi mumkin
// }

// // Rivojlanish rejimida global o‘zgaruvchini tekshirib, ulanishni saqlaymiz
// if (process.env.NODE_ENV === "development") {
//   if (!globalThis._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalThis._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalThis._mongoClientPromise;
// } else {
//   // Prodyuksiya rejimida yangi MongoClient ulanishi yaratamiz
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // 🔥 Bazaga ulanish uchun qulay funksiya
// export const connectToDB = async () => {
//   const client = await clientPromise;
//   const db = client.db(); // Default bazani olish
//   return db;
// };

// export default clientPromise;

import { MongoClient, ObjectId } from "mongodb";

// MongoDB URI va parametrlar
const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 🔥 Asosiy ulanish funksiyasi
export const connectToDB = async () => {
  const client = await clientPromise;
  const db = client.db(); // Default bazani olish
  return db;
};

// 🔥 ID bo'yicha ish topish funksiyasi
export const getJobById = async (id: string) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("jobs"); // "jobs" - sizning kollektsiya nomingiz
    
    // Agar MongoDB ObjectId ishlatilsa
    const objectId = new ObjectId(id);
    const job = await collection.findOne({ _id: objectId });
    
    // Agar oddiy string ID ishlatilsa
    // const job = await collection.findOne({ id: id });
    
    if (!job) return null;
    
    return {
      id: job._id.toString(),
      jobname: job.jobname,
      location: job.location,
      work_type: job.work_type,
      work_hours: job.work_hours,
      salary: job.salary,
      language: job.language,
      visa_type: job.visa_type,
      contact: job.contact,
      work_days: job.work_days,
      posted_date: job.posted_date || job.createdAt
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};

export default clientPromise;