import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/hashPassword";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, password, isSubscribed } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("raska");

    const updateData: any = {
      name,
      isSubscribed,
    };

    const provider = session.user.provider || "credentials";

    if (password?.trim() && provider !== "google") {
      updateData.password = await hashPassword(password);
    }

    const result = await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
