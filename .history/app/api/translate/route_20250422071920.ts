// //app/api/translate/route.ts

// import axios from 'axios';

// export async function POST(request: Request) {
//   const { text, sourceLang, targetLang } = await request.json();

//   try {
//     const response = await axios.post('http://your-libretranslate-server/translate', {
//       q: text,
//       source: sourceLang,
//       target: targetLang,
//       format: "text",
//     });

//     return new Response(
//       JSON.stringify({ translatedText: response.data.translatedText }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('Tarjima xatosi:', error);
//     return new Response(
//       JSON.stringify({ error: 'Tarjima qilishda xato' }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }


// app/api/translate/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { text, sourceLang, targetLang } = await request.json();

  // Agar tillar bir xil bo'lsa, tarjima qilish shart emas
  if (sourceLang === targetLang) {
    return NextResponse.json({ translatedText: text });
  }

  try {
    const LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL || 'http://localhost:5000';
    
    const response = await axios.post(`${LIBRETRANSLATE_URL}/translate`, {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    });

    return NextResponse.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error.message },
      { status: 500 }
    );
  }
}