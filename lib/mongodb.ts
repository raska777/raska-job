
// // export default clientPromise;

// import { MongoClient, ObjectId } from "mongodb";

// // MongoDB URI va parametrlar
// const uri = process.env.MONGODB_URI as string;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!uri) {
//   throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
// }

// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (process.env.NODE_ENV === "development") {
//   if (!globalThis._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalThis._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalThis._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // 🔥 Asosiy ulanish funksiyasi
// export const connectToDB = async () => {
//   const client = await clientPromise;
//   const db = client.db(); // Default bazani olish
//   return db;
// };

// // 🔥 ID bo'yicha ish topish funksiyasi
// export const getJobById = async (id: string) => {
//   try {
//     const db = await connectToDB();
//     const collection = db.collection("jobs"); // "jobs" - sizning kollektsiya nomingiz
    
//     // Agar MongoDB ObjectId ishlatilsa
//     const objectId = new ObjectId(id);
//     const job = await collection.findOne({ _id: objectId });
    
//     // Agar oddiy string ID ishlatilsa
//     // const job = await collection.findOne({ id: id });
    
//     if (!job) return null;
    
//     return {
//       id: job._id.toString(),
//       jobname: job.jobname,
//       location: job.location,
//       work_type: job.work_type,
//       work_hours: job.work_hours,
//       salary: job.salary,
//       language: job.language,
//       visa_type: job.visa_type,
//       contact: job.contact,
//       work_days: job.work_days,
//       posted_date: job.posted_date || job.createdAt
//     };
//   } catch (error) {
//     console.error("Error fetching job:", error);
//     return null;
//   }
// };

// export default clientPromise;








// import {  Db, Collection } from 'mongodb';

// interface SavedJob {
//   userId: string;
//   jobId: string;
//   jobData: any;
//   savedAt: Date;
// }

// const MONGODB_URI = process.env.MONGODB_URI!;
// const MONGODB_DB = process.env.MONGODB_DB!;

// let cachedClient: MongoClient;
// let cachedDb: Db;

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb };
//   }

//   const client = await MongoClient.connect(MONGODB_URI);
//   const db = client.db(MONGODB_DB);

//   cachedClient = client;
//   cachedDb = db;

//   return { client, db };
// }

// export async function getSavedJobsCollection(): Promise<Collection<SavedJob>> {
//   const { db } = await connectToDatabase();
//   return db.collection<SavedJob>('savedJobs');
// }




import { MongoClient, ObjectId, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) {
  throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise!;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// ✅ Umumiy ulanish (asosiy eksport)
export default clientPromise;

// 🔧 Bazani olish
export async function connectToDB(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

// 🔍 ID orqali ish topish
export async function getJobById(id: string) {
  try {
    const db = await connectToDB();
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) });
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
}

// 💾 Saqlangan ishlarni olish
interface SavedJob {
  userId: string;
  jobId: string;
  jobData: any;
  savedAt: Date;
}

export async function getSavedJobsCollection(): Promise<Collection<SavedJob>> {
  const db = await connectToDB();
  return db.collection<SavedJob>('savedJobs');
}
