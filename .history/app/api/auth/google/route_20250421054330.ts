// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Google OAuth parametrlari
//     const params = new URLSearchParams({
//       client_id: process.env.GOOGLE_CLIENT_ID || "",
//       redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
//       response_type: "code",
//       scope: "openid email profile",
//       access_type: "offline",
//       prompt: "consent",
//     });

//     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
//     return NextResponse.redirect(authUrl);
//   } catch (error) {
//     console.error("Google auth error:", error);
//     return NextResponse.json(
//       { error: "Google autentifikatsiyada xatolik" },
//       { status: 500 }
//     );
//   }
// }