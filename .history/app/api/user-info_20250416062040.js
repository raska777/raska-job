// pages/api/user-info.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email } = req.query;
  const client = await clientPromise;
  const db = client.db("raska");

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    isSubscribed: user.isSubscribed || false, 
  });
}