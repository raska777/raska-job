// pages/api/saveJob.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma'; // Prisma klientini import qilish

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { jobId, userId } = req.body;

  try {
    // Tekshirish: Bu ish allaqachon saqlanganmi?
    const existingSavedJob = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    if (existingSavedJob) {
      return res.status(200).json({ message: 'Bu ish allaqachon saqlangan' });
    }

    // Yangi saqlangan ish yaratish
    const savedJob = await prisma.savedJob.create({
      data: {
        jobId,
        userId,
      },
    });

    res.status(200).json({ 
      message: 'Ish muvaffaqiyatli saqlandi',
      savedJob 
    });
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}