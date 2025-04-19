// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI as string;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// declare global {
//   var _mongoClientPromise: Promise<MongoClient>;
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // 🔥 Bu yerda bazani olish uchun qulay funksiya qo‘shamiz
// export const connectToDB = async () => {
//   const client = await clientPromise;
//   const db = client.db(); // Default bazani olib beradi (URI'dagi nom asosida)
//   return db;
// };

// export default clientPromise;

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
}

// TypeScript-ga globalThis._mongoClientPromise o'zgaruvchisini qanday ishlashini aytib beramiz
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  // Rivojlanish rejimida client ulanishini saqlash uchun global o‘zgaruvchidan foydalanamiz
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 🔥 Bu yerda bazani olish uchun qulay funksiya qo‘shamiz
export const connectToDB = async () => {
  const client = await clientPromise;
  const db = client.db(); // Default bazani olib beradi (URI'dagi nom asosida)
  return db;
};

export default clientPromise;
