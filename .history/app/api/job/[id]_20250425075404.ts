// pages/api/job/[id].ts
import { getJobById } from 'lib/mongodb.ts'; // Bu sizning DB funksiyangiz
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Faqat GET so\'rovlari qo\'llab-quvvatlanadi' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID noto\'g\'ri kiritilgan' });
  }

  try {
    const job = await getJobById(id);
    if (!job) {
      return res.status(404).json({ error: 'Ish topilmadi' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Server xatosi:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
}