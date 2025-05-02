import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// E’lonni o‘chirish: DELETE /api/admin/jobs/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('raska');

    const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'E’lon topilmadi' }, { status: 404 });
    }

    return NextResponse.json({ message: '✅ E’lon muvaffaqiyatli o‘chirildi' });
  } catch (error) {
    console.error('E’lon o‘chirishda xatolik:', error);
    return NextResponse.json({ error: 'Server xatosi' }, { status: 500 });
  }
}

// E’lonni yangilash: PATCH /api/admin/jobs/[id]
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const body = await req.json();
      const {...updateData } = body; //  _id ni chiqarib tashlaymiza
  
      const client = await clientPromise;
      const db = client.db('raska');
  
      const result = await db.collection('jobs').updateOne(
        { _id: new ObjectId(params.id) },
        { $set: updateData }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'E’lon topilmadi' }, { status: 404 });
      }
  
      return NextResponse.json({ message: '✅ E’lon yangilandi' });
    } catch (error) {
      console.error('E’lon tahrirlashda xatolik:', error);
      return NextResponse.json({ error: 'Server xatosi' }, { status: 500 });
    }
  }
  