// pages/api/job/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getJobById } from 'lib/mongodb.ts'; // Bu sizning DB funksiyangiz

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const job = await getJobById(id as string);
    if (!job) {
      return res.status(404).json({ error: 'Ish topilmadi' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Server xatosi' });
  }
}