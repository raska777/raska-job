import { NextResponse } from 'next/server';
import { LANG_CODES } from '/utils/langCodes';

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({
        text,
        target_lang: LANG_CODES[targetLang] || 'EN',
      }),
    });

    const data = await response.json();
    return NextResponse.json(data?.translations?.[0]?.text || text);
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
