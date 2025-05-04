// // app/api/admin/users/[id]/route.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user?.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");
//     const user = await db.collection("users").findOne(
//       { _id: new ObjectId(params.id) },
//       { projection: { password: 0 } }
//     );

//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session || session.user?.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const result = await db.collection("users").updateOne(
//       { _id: new ObjectId(params.id) },
//       { $set: body }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(
//     req: Request,
//     context: { params: { id: string } }
//   ) {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user?.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
  
//     try {
//       const { id } = context.params;
//       const client = await clientPromise;
//       const db = client.db("raska");
//       const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  
//       if (result.deletedCount === 0) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//       }
  
//       return NextResponse.json({ message: "User deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
//   }
  
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("raska");
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(params.id) },
      { projection: { password: 0 } }
    );

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, isSubscribed } = body;

    const allowedRoles = ['user', 'admin', 'employer'];

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (typeof isSubscribed === 'boolean') updateFields.isSubscribed = isSubscribed;
    if (role && allowedRoles.includes(role)) updateFields.role = role;

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    if (session.user.id === id) {
      return NextResponse.json({ error: "Siz o'zingizni o'chira olmaysiz" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
