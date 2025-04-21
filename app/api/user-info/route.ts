

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

    const user = await db.collection("users").findOne(
      { email: session.user.email },
      { 
        projection: { 
          name: 1, 
          isSubscribed: 1, 
          provider: 1,
          emailVerified: 1,
          createdAt: 1
        } 
      }
    );

    return Response.json({
      name: user?.name || session.user.name || "",
      isSubscribed: user?.isSubscribed || false,
      provider: user?.provider || "credentials",
      isEmailVerified: user?.emailVerified || false,
      createdAt: user?.createdAt || null
    });
  } catch (error) {
    console.error("GET /api/user-info error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}