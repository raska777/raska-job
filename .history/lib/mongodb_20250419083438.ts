import { MongoClient } from "mongodb";

// MongoDB URI va parametrlar
const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Agar MONGODB_URI aniqlanmagan bo‘lsa, xatolikni ko‘rsatamiz
if (!uri) {
  throw new Error("MONGODB_URI aniqlanmagan (.env.local faylida)");
}

// Global deklaratsiya: globalThis orqali _mongoClientPromise o‘zgaruvchisini e'lon qilamiz
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // Bu erda undefined ni qo‘shish kerak, chunki u boshlang‘ichda mavjud bo‘lmasligi mumkin
}

// Rivojlanish rejimida global o‘zgaruvchini tekshirib, ulanishni saqlaymiz
if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // Prodyuksiya rejimida yangi MongoClient ulanishi yaratamiz
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 🔥 Bazaga ulanish uchun qulay funksiya
export const connectToDB = async () => {
  const client = await clientPromise;
  const db = client.db(); // Default bazani olish
  return db;
};

export default clientPromise;
