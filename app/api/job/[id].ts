// // pages/api/job/[id].ts
// import { getJobById } from 'lib/mongodb'; // Bu sizning DB funksiyangiz
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Faqat GET so\'rovlari qo\'llab-quvvatlanadi' });
//   }

//   const { id } = req.query;

//   if (!id || typeof id !== 'string') {
//     return res.status(400).json({ error: 'ID noto\'g\'ri kiritilgan' });
//   }

//   try {
//     const job = await getJobById(id);
//     if (!job) {
//       return res.status(404).json({ error: 'Ish topilmadi' });
//     }
//     res.status(200).json(job);
//   } catch (error) {
//     console.error('Server xatosi:', error);
//     res.status(500).json({ error: 'Server xatosi' });
//   }
// }
// pages/api/job/[id].ts
import { getJobById } from 'lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET 요청만 지원됩니다' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: '잘못된 ID 형식입니다' });
  }

  try {
    const job = await getJobById(id);
    if (!job) {
      return res.status(404).json({ error: '채용 정보를 찾을 수 없습니다' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('서버 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다' });
  }
}