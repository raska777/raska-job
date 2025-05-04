// app/api/admin/subscribe-all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Faqat adminlar uchun ruxsat
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat yo‘q' }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db('raska');

    const result = await db.collection('users').updateMany(
      { isSubscribed: false }, // Faqat unsubscribed foydalanuvchilarni yangilash
      { $set: { isSubscribed: true } }
    );

    return NextResponse.json({
      message: `${result.modifiedCount} ta foydalanuvchi obunaga qo‘shildi.`,
    });
  } catch (err) {
    console.error('Subscribe xatolik:', err);
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}
