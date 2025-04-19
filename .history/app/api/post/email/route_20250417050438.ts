// // app/api/post/email/route.ts

// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import sendEmail from "@/lib/email";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query")?.toLowerCase() || "";
//     const city = searchParams.get("city")?.toLowerCase() || "";

//     const client = await clientPromise;
//     const db = client.db("raska");

//     let jobsQuery: any = {};

//     const orConditions = [];

//     if (query) {
//       orConditions.push(
//         { work_type: { $regex: query, $options: "i" } },
//         { location: { $regex: query, $options: "i" } },
//         { language: { $regex: query, $options: "i" } },
//         { visa_type: { $regex: query, $options: "i" } }
//       );
//     }

//     if (orConditions.length > 0) {
//       jobsQuery.$or = orConditions;
//     }
    
//     if (city) {
//       jobsQuery.location = { $regex: city, $options: "i" };
//     }

//     const jobs = await db
//       .collection("jobs")
//       .find(jobsQuery)
//       .sort({ createdAt: -1 })
//       .toArray();

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/post xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi!" }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   const { to, subject, text } = await request.json();

//   try {
//     // Email yuborish uchun `sendEmail` funksiyasini chaqirish
//     await sendEmail(to, subject, text);
//     return NextResponse.json({ message: 'Email yuborildi!' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
//   }
// }

//-------
import express, { Request, Response } from 'express';
import { validateEmail, validatePostNotification } from '../middleware/validation';

const router = express.Router();

/**
 * @route POST /api/email/welcome
 * @desc Yangi foydalanuvchiga xush kelibsiz emaili yuborish
 * @access Admin
 */
router.post('/welcome', 
  authenticate,
  authorize(['admin']),
  validateEmail,
  async (req: Request, res: Response) => {
    try {
      const { email, name } = req.body;
      
      const result = await emailService.sendWelcomeEmail(email, name);
      
      if (result) {
        return res.status(200).json({ 
          success: true,
          message: 'Xush kelibsiz emaili muvaffaqiyatli yuborildi' 
        });
      }
      
      throw new Error('Email yuborishda xatolik');
    } catch (error) {
      console.error('Xush kelibsiz emaili xatosi:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Xush kelibsiz emailini yuborishda xatolik',
        error: error.message 
      });
    }
  }
);

/**
 * @route POST /api/email/notify-post
 * @desc Yangi post haqida obunachilarga bildirishnoma yuborish
 * @access Admin | Author
 */
router.post('/notify-post',
  authenticate,
  authorize(['admin', 'author']),
  validatePostNotification,
  async (req: Request, res: Response) => {
    try {
      const { postId, postTitle } = req.body;
      
      const result = await emailService.sendNewPostNotification({ 
        _id: postId, 
        title: postTitle 
      });
      
      if (result) {
        return res.status(200).json({ 
          success: true,
          message: 'Bildirishnomalar muvaffaqiyatli yuborildi' 
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Obunachilar topilmadi, email yuborilmadi'
      });
    } catch (error) {
      console.error('Bildirishnoma yuborish xatosi:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Bildirishnomalarni yuborishda xatolik',
        error: error.message 
      });
    }
  }
);

/**
 * @route POST /api/email/custom
 * @desc Admin uchun maxsus email yuborish
 * @access Admin
 */
router.post('/custom',
  authenticate,
  authorize(['admin']),
  validateEmail,
  async (req: Request, res: Response) => {
    try {
      const { to, subject, content } = req.body;
      
      // Agar to massiv bo'lsa, har biriga alohida yuborish
      if (Array.isArray(to)) {
        for (const email of to) {
          await emailService.sendEmail(email, subject, content);
        }
      } else {
        await emailService.sendEmail(to, subject, content);
      }
      
      return res.status(200).json({ 
        success: true,
        message: 'Email(lar) muvaffaqiyatli yuborildi' 
      });
    } catch (error) {
      console.error('Maxsus email yuborish xatosi:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Email yuborishda xatolik',
        error: error.message 
      });
    }
  }
);

export default router;