import { NextResponse } from 'next/server';
import { LANG_CODES } from 'utils/langcodes';

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();

    const langCode = LANG_CODES[targetLang] || 'EN';

    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY || ''}`,
      },
      body: new URLSearchParams({
        text,
        target_lang: langCode,
      }),
    });

    const rawText = await response.text();

    try {
      const data = JSON.parse(rawText);
      const translated = data?.translations?.[0]?.text || text;
      return NextResponse.json({ translated });
    } catch (jsonError) {
      console.error('Tarjima qilishda JSON xatolik:', rawText);
      return NextResponse.json({ error: 'Tarjima javobi noto‘g‘ri', rawText }, { status: 500 });
    }

  } catch (error) {
    console.error('Tarjima API xatosi:', error);
    return NextResponse.json({ error: 'Tarjima qilishda xatolik yuz berdi' }, { status: 500 });
  }
}
