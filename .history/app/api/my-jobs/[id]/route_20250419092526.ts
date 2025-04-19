import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper function to sanitize update data (remove _id)
function sanitizeUpdateData(body: Record<string, unknown>) {
  const { _id, ...updateData } = body;
  console.log("id:", _id); // Just for debugging, remove in production
  return updateData;
}

// PUT request: Update job listing
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // id ni URL'dan olish

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing job ID in request" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      { $set: sanitizeUpdateData(body) }
    );

    return result.modifiedCount === 1
      ? NextResponse.json(
          { success: true, message: "Job updated successfully" },
          { status: 200 }
        )
      : NextResponse.json(
          { success: false, error: "Job not found or no changes made" },
          { status: 404 }
        );
  } catch (error: unknown) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE request: Delete job listing
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");
    const { id } = params;  // Make sure this is extracted from params

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(id),
      creator: session.user.id,
    });

    return result.deletedCount === 1
      ? NextResponse.json(
          { success: true, message: "Job deleted successfully" },
          { status: 200 }
        )
      : NextResponse.json(
          { success: false, error: "Job not found" },
          { status: 404 }
        );
  } catch (error: unknown) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
