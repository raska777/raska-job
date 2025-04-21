// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import { hashPassword } from "@/lib/hashPassword"; // agar parol hash qilish kerak bo‘lsa

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   if (req.method !== 'PATCH') {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, name, password, isSubscribed } = req.body;

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const updateData = { name, isSubscribed };

//     if (password && password.trim() !== "") {
//       // Parolni hash qilish kerakkuu
//       updateData.password = await hashPassword(password);
//     }

//     await db.collection("users").updateOne({ email }, { $set: updateData });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("PATCH /api/settings error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
//yangi test 
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import clientPromise from "@/lib/mongodb";
// import { hashPassword } from "@/lib/hashPassword"; // agar parol hash qilish kerak bo‘lsa

// export default async function handler(req, res) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   if (req.method !== 'PATCH') {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, name, password, isSubscribed } = req.body;

//   try {
//     const client = await clientPromise;
//     const db = client.db("raska");

//     const updateData = { name, isSubscribed };

//     if (password && password.trim() !== "") {
//       // Parolni hash qilish kerakkuu
//       updateData.password = await hashPassword(password);
//     }

//     await db.collection("users").updateOne({ email }, { $set: updateData });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("PATCH /api/settings error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }


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
      isSubscribed 
    };

    // Faqat parol kiritilgan bo'lsa va Google foydalanuvchi bo'lmasa
    if (password?.trim() && session.user.provider !== 'google') {
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