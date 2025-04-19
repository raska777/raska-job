
// //app/api/user/subscription/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";

// // GET - obuna holatini olish
// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return NextResponse.json({ isSubscribed: false });

//   const client = await clientPromise;
//   const db = client.db("raska");
//   const user = await db.collection("users").findOne({ email: session.user.email });

//   return NextResponse.json({ isSubscribed: user?.isSubscribed ?? false });
// }

// // PATCH - obunani yoqish/o‘chirish
// export async function PATCH() {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const client = await clientPromise;
//   const db = client.db("raska");

//   const user = await db.collection("users").findOne({ email: session.user.email });
//   const newStatus = !(user?.isSubscribed ?? false);

//   await db.collection("users").updateOne(
//     { email: session.user.email },
//     { $set: { isSubscribed: newStatus } },
//     { upsert: true }
//   );

//   return NextResponse.json({ isSubscribed: newStatus });
// }

//
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ isSubscribed: false }, { status: 200 });
    }

    const client = await clientPromise;
    const db = client.db("raska");
    const user = await db.collection("users").findOne({ 
      email: session.user.email 
    });

    return NextResponse.json(
      { isSubscribed: user?.isSubscribed ?? false },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Obuna holatini olishda xato:", error);
    return NextResponse.json(
      { error: "Server xatosi", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Avtorizatsiya talab qilinadi" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");

    const user = await db.collection("users").findOne({ 
      email: session.user.email 
    });
    const newStatus = !(user?.isSubscribed ?? false);

    await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: { isSubscribed: newStatus } }
    );

    return NextResponse.json(
      { isSubscribed: newStatus },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Obunani yangilashda xato:", error);
    return NextResponse.json(
      { error: "Server xatosi", details: error.message },
      { status: 500 }
    );
  }
}