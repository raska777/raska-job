import { NextResponse } from 'next/server';
import { LANG_CODES, isSupportedLang } from '@/utils/langcodes';

export const runtime = 'edge'; // Edge Runtime uchun

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid text parameter' },
        { status: 400 }
      );
    }

    if (!isSupportedLang(targetLang)) {
      return NextResponse.json(
        { error: 'Unsupported target language' },
        { status: 400 }
      );
    }

    const langCode = LANG_CODES[targetLang];
    const apiUrl = process.env.DEEPL_API_URL || 'https://api.deepl.com/v2/translate';

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({
        text,
        target_lang: langCode,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('DeepL API error:', error);
      return NextResponse.json({ error: 'Translation failed' }, { status: 502 });
    }

    const data = await res.json();
    const translated = data.translations?.[0]?.text || text;

    return NextResponse.json({ text: translated });
  } catch (err) {
    console.error('Translation error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}