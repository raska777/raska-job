// app/api/admin/notify-users/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import sendEmail from '@/lib/email';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('raska');

    // Get all subscribed users with emails
    const subscribedUsers = await db.collection('users')
      .find({ 
        isSubscribed: true, 
        email: { $exists: true, $ne: null } 
      })
      .project({ email: 1, name: 1 })
      .toArray();

    if (subscribedUsers.length === 0) {
      return NextResponse.json({ 
        message: "Obuna bo'lgan foydalanuvchilar topilmadi" 
      });
    }

    let successCount = 0;
    const failedEmails: string[] = [];

    // Send notifications in parallel
    await Promise.all(subscribedUsers.map(async (user) => {
      try {
        await sendEmail(
          user.email,
          `⚠️ Raska Job Platformasi test rejimi`,
          `<!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { color: #4f6df5; text-align: center; }
              .content { margin: 20px 0; }
              .footer { font-size: 0.9em; color: #666; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Raska Job Platformasi</h2>
              </div>
              <div class="content">
                <p>Hurmatli ${user.name || 'foydalanuvchi'},</p>
                <p>Platformamiz hozirda test rejimida ishlamoqda. Shu sababli sizga ko'plab test xabarlari yetib borishi mumkin.</p>
                <p>Buning oldini olish maqsadida, sizning obunangiz vaqtincha o'chirildi.</p>
                <p>Platforma to'liq ishga tushgach, obunangiz avtomatik ravishda qayta yoqiladi.</p>
              </div>
              <div class="footer">
                <p>Raska jamoasi</p>
              </div>
            </div>
          </body>
          </html>`
        );
        successCount++;
      } catch (err) {
        console.error(`📧 ${user.email} ga xabar yuborishda xatolik:`, err);
        failedEmails.push(user.email);
      }
    }));

    // Unsubscribe all users
    const updateResult = await db.collection('users').updateMany(
      { isSubscribed: true },
      { $set: { isSubscribed: false } }
    );

    return NextResponse.json({ 
      message: `${successCount} ta foydalanuvchiga xabar yuborildi`,
      failedCount: failedEmails.length,
      failedEmails,
      unsubscribedCount: updateResult.modifiedCount
    });

  } catch (err) {
    console.error("Xabar yuborishda xatolik:", err);
    return NextResponse.json({ 
      error: "Server xatosi",
      details: err instanceof Error ? err.message : 'Nomalum xato'
    }, { status: 500 });
  }
}