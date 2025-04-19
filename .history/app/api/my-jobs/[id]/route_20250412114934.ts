import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PUT request: E’lonni yangilash
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // params.id ni to'g'ri await qilish
    const { id } = await params;  // params ni await qilib olish

    const body = await req.json();  // so'rovdan JSON ma'lumotlarini olish

    const client = await clientPromise;
    const db = client.db("raska");

    // _id maydonini yangilashni oldini olish
    const { _id, ...updateData } = body;  // _id'ni olib tashlash

    const result = await db.collection("jobs").updateOne(
      { _id: new ObjectId(id) },  // ObjectId formatiga o'zgartirish
      { $set: updateData }  // faqat boshqa maydonlarni yangilash
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Yangilashda xatolik yuz berdi." }, { status: 400 });
    }

    return NextResponse.json({ message: "E’lon yangilandi ✅" }, { status: 200 });
  } catch (error) {
    console.error("Error during PUT:", error);
    return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
  }
}

// DELETE request: E’lonni o‘chirish
// app/api/my-jobs/[id]/route.ts


// DELETE request: E’lonni o‘chirish
// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         // Login qilgan foydalanuvchi sessiyasini olish
//         const session = await getServerSession(authOptions);

//         // Agar foydalanuvchi login qilmagan bo'lsa, ruxsat berilmasin
//         if (!session || !session.user || !session.user.id) {
//             return NextResponse.json({ error: "Ruxsat yo‘q. Iltimos, tizimga kiring." }, { status: 401 });
//         }

//         const { id } = params;

//         const client = await clientPromise;
//         const db = client.db("raska");

//         // Konsolga chiqarish (tekshirish uchun)
//         console.log("E'lonni o'chirish uchun ID:", id);
//         console.log("Foydalanuvchi ID:", session.user.id);

//         // E'lonni faqat egasi o‘chira oladi
//         const result = await db.collection("jobs").deleteOne({
//             _id: new ObjectId(id),          // E'lon ID sini qidirmoqda
//             creator: session.user.id,       // Foydalanuvchi ID si bilan solishtirish
//         });

//         // DeleteOne natijalarini tekshirish
//         console.log("DeleteOne natija:", result);

//         if (result.deletedCount === 0) {
//             return NextResponse.json({ error: "E’lon topilmadi yoki ruxsat yo‘q" }, { status: 404 });
//         }

//         return NextResponse.json({ message: "E’lon o‘chirildi ✅" }, { status: 200 });
//     } catch (error: unknown) {
//         // Xatolikni loglash va foydalanuvchiga xato haqida ma'lumot berish
//         if (error instanceof Error) {
//             console.error("DELETE xatolik:", error.message);
//             console.error("Stack trace:", error.stack);
//         } else {
//             console.error("Noma'lum xatolik yuz berdi");
//         }
//         return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//     }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Ruxsat yo‘q. Iltimos, tizimga kiring." },
        { status: 401 }
      );
    }

    const { id } = params;

    const client = await clientPromise;
    const db = client.db("raska");

    const result = await db.collection("jobs").deleteOne({
      _id: new ObjectId(id),
      creator: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "E’lon topilmadi yoki ruxsat yo‘q" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "E’lon o‘chirildi ✅" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE xatolik:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}