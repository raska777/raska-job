import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    if (!password) {
      return NextResponse.json(
        { strength: 0 },
        { status: 200 }
      );
    }

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    return NextResponse.json(
      { strength },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password check error:", error);
    return NextResponse.json(
      { strength: 0 },
      { status: 200 }
    );
  }
}