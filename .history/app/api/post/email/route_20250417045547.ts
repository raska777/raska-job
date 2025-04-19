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
import { sendWelcomeEmail, sendNewPostNotification } from './email';
import { authenticate, authorize } from '../middleware/auth'; // Assuming you have auth middleware
import { validateEmailRequest } from '../middleware/validation'; // Add validation as needed

const router = express.Router();

/**
 * @route POST /api/email/welcome
 * @desc Send welcome email to new user
 * @access Private (Admin or Auth)
 */
router.post('/welcome', authenticate, authorize(['admin']), async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    await sendWelcomeEmail(email, name);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Welcome email error:', error);
    res.status(500).json({ message: 'Failed to send welcome email' });
  }
});

/**
 * @route POST /api/email/notify-post
 * @desc Send notification about new post to all subscribed users
 * @access Private (Admin or Author)
 */
router.post('/notify-post', authenticate, authorize(['admin', 'author']), async (req: Request, res: Response) => {
  try {
    const { postId, postTitle } = req.body;
    
    if (!postId || !postTitle) {
      return res.status(400).json({ message: 'Post ID and title are required' });
    }

    await sendNewPostNotification({ _id: postId, title: postTitle });
    res.status(200).json({ message: 'Post notifications sent successfully' });
  } catch (error) {
    console.error('Post notification error:', error);
    res.status(500).json({ message: 'Failed to send post notifications' });
  }
});

/**
 * @route POST /api/email/custom
 * @desc Send custom email (admin only)
 * @access Private (Admin)
 */
router.post('/custom', authenticate, authorize(['admin']), async (req: Request, res: Response) => {
  try {
    const { to, subject, content } = req.body;
    
    if (!to || !subject || !content) {
      return res.status(400).json({ message: 'Recipient, subject and content are required' });
    }

    // Validate email addresses
    const recipients = Array.isArray(to) ? to : [to];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (const email of recipients) {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: `Invalid email address: ${email}` });
      }
    }

    // Send emails in batches
    const batchSize = 5;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      await Promise.all(
        batch.map(email => sendEmail(email, subject, content))
      );
    }

    res.status(200).json({ message: 'Custom emails sent successfully' });
  } catch (error) {
    console.error('Custom email error:', error);
    res.status(500).json({ message: 'Failed to send custom emails' });
  }
});

export default router;