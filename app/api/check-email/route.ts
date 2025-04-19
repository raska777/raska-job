import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { exists: false, error: "Email kiritilishi shart" },
        { status: 200 }
      );
    }

    const client = await clientPromise;
    const db = client.db("raska");
    
    const existingUser = await db.collection("users").findOne({ email });
    
    return NextResponse.json(
      { exists: !!existingUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email check error:", error);
    return NextResponse.json(
      { exists: false, error: "Server xatosi" },
      { status: 200 }
    );
  }
}