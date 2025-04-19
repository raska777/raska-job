// pages/api/settings.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email, name, password, isSubscribed } = req.body;
  const client = await clientPromise;
  const db = client.db("raska");

  try {
    const updateData = { name, isSubscribed };
    if (password) {
      // Parolni hash qilish (agar o'zgartirilgan bo'lsa)
      updateData.password = await hashPassword(password);
    }

    await db.collection("users").updateOne(
      { email },
      { $set: updateData }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Settings update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}