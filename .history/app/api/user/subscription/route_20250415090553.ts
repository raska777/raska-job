// pages/api/user/subscription.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'lib/mongodb.ts'; // MongoDB bilan bog'lanish

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { email, subscribe } = req.body;

    // MongoDBga ulanish
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Foydalanuvchini yangilash
    const updatedUser = await usersCollection.findOneAndUpdate(
      { email },
      { $set: { isSubscribed: subscribe } },
      { returnDocument: 'after' }
    );

    res.status(200).json({ isSubscribed: updatedUser.value.isSubscribed });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
