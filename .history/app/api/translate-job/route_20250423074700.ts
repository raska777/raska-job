// app/api/translate/route.ts
import { NextResponse } from 'next/server';
import { LANG_CODES } from 'utils/langcodes';

export async function POST(request: Request) {
  const { text, targetLang } = await request.json();

  // Validate input
  if (!text || !targetLang) {
    return NextResponse.json(
      { error: 'Missing text or targetLang' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({
        text: text,
        target_lang: LANG_CODES[targetLang] || 'EN',
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data?.translations?.[0]?.text || text);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error.message },
      { status: 500 }
    );
  }
}