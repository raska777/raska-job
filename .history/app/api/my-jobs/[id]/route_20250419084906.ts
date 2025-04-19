
// import { NextRequest, NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import clientPromise from "@/lib/mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// // Helper function to remove _id from the request body
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function sanitizeUpdateData(body: any) {
//   const { _id, ...updateData } = body;

//   console.log("_id:", _id)
//   return updateData;
// }



// // PUT request: Update job listing
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("raska");

//     // Remove _id from the update data
//     const updateData = sanitizeUpdateData(body);

//     const result = await db.collection("jobs").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );

//     if (result.modifiedCount === 0) {
//       return NextResponse.json(
//         { success: false, error: "Update failed - document not found or no changes made" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Job updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE request: Delete job listing
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized - please log in" },
//         { status: 401 }
//       );
//     }

//     const { id } = params;
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const result = await db.collection("jobs").deleteOne({
//       _id: new ObjectId(id),
//       creator: session.user.id,
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: "Job not found or you don't have permission to delete it" 
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Job deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;  // Access params through context
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("raska");

    // Remove _id from the update data
    const updateData = sanitizeUpdateData(body);

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Update failed - document not found or no changes made" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Job updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}