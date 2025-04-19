import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DELETE request: E’lonni o‘chirish
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Login qilgan foydalanuvchi sessiyasini olish
        const session = await getServerSession(authOptions);

        // Agar foydalanuvchi login qilmagan bo'lsa, ruxsat berilmasin
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "Ruxsat yo‘q. Iltimos, tizimga kiring." }, { status: 401 });
        }

        const { id } = params;

        const client = await clientPromise;
        const db = client.db("raska");

        // E'lonni faqat egasi o‘chira oladi
        const result = await db.collection("jobs").deleteOne({
            _id: new ObjectId(id),          // E'lon ID sini qidirmoqda
            creator: session.user.id,       // Foydalanuvchi ID si bilan solishtirish
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "E’lon topilmadi yoki ruxsat yo‘q" }, { status: 404 });
        }

        return NextResponse.json({ message: "E’lon o‘chirildi ✅" }, { status: 200 });
    } catch (error: unknown) {
        // Xatolikni loglash va foydalanuvchiga xato haqida ma'lumot berish
        if (error instanceof Error) {
            console.error("DELETE xatolik:", error.message);
            console.error("Stack trace:", error.stack);
        } else {
            console.error("Noma'lum xatolik yuz berdi");
        }
        return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
    }
}
