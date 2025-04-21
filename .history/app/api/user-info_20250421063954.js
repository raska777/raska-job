// // pages/api/user-info.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   console.log(session)
//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const { email } = req.query;
//   const client = await clientPromise;
//   const db = client.db("raska");

//   const user = await db.collection("users").findOne({ email });

//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   res.status(200).json({
//     isSubscribed: user.isSubscribed || false, 
//   });
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");
    
    const user = await db.collection("users").findOne({ 
      email: session.user.email 
    }, {
      projection: { name: 1, isSubscribed: 1, provider: 1 }
    });

    return Response.json({
      name: user?.name || session.user.name || '',
      isSubscribed: user?.isSubscribed || false,
      provider: user?.provider || 'credentials'
    });
  } catch (error) {
    console.error("GET /api/user-info error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}