// app/api/ai-help/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Noto‘g‘ri so‘rov formati.' }, { status: 400 });
    }

    const systemPrompt = `
      Siz Koreya immigratsiyasi va mehnat qonunlari bo‘yicha mutaxassissiz. 
      Asosan quyidagi mavzularda aniq, to‘liq ma‘lumot bering:

      - Koreyada ishlash uchun vizalar (E-9, H-2, E-7 va boshqalar)
      - EPS (Ish Ruxsatnomasi Tizimi) jarayoni
      - Koreyada qonuniy va noqonuniy ishlash holatlari
      - Ishchi huquqlari va himoyasi
      - Hujjatlar tayyorlash va ariza topshirish tartibi
      - Koreyada ishlash uchun shartnomalar

      Javoblaringizda quyidagilarga e‘tibor bering:
      1. Uzbek va koreys tillaridagi atamalarni ishlating (masalan: "고용허가제 (Ish Ruxsatnomasi Tizimi)")
      2. Aniq raqamli ma‘lumotlar va rasmiy manbalarga havolalar
      3. Qonuniy maslahat kerak bo‘lgan holatlarda 1345 Koreya Immigratsiya Markaziga murojaat qilishni tavsiya qiling
      4. Noaniq holatlarda "bilmayman" deb javob bering

      Javoblaringiz foydalanuvchilar uchun tushunarli va amaliy bo‘lsin.
      Koreya hukumati rasmiy vebsaytlariga havolalar qo‘shing.
    `;

    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const answer = chat.choices[0]?.message?.content?.trim();
    return NextResponse.json({ answer: answer || 'Javob generatsiya qilinmadi.' });
  } catch (error: any) {
    console.error('AI xatosi:', error);
    return NextResponse.json(
      { error: error?.message || 'AI dan javob olishda xatolik' },
      { status: 500 }
    );
  }
}