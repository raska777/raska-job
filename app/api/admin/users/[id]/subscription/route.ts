
// app/api/admin/users/[id]/subscription/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { subscribe } = body;

    if (typeof subscribe !== 'boolean') {
      return NextResponse.json({ error: 'Invalid "subscribe" value' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('raska');

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          isSubscribed: subscribe,
          subscriptionUpdatedAt: new Date(),
          ...(subscribe ? { subscribedAt: new Date() } : {}),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: `User successfully ${subscribe ? 'subscribed' : 'unsubscribed'}`,
    });
  } catch (error) {
    console.error('Subscription update error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
