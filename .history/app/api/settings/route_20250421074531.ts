import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, password, isSubscribed } = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    const updateData: any = {
      name,
      isSubscribed,
      updatedAt: new Date(),
    };

    if (password) {
      updateData.password = await hash(password, 10);
    }

    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}