import { NextResponse } from 'next/server';
import { LANG_CODES } from 'utils/langcodes';

export async function POST(req: Request) {
  console.log('[Translate API] Received payload');
  const body = await req.json();
  console.log('[Translate API] Payload:', body);

  const { text, targetLang } = body;
  const langCode = LANG_CODES[targetLang] || 'EN';
  console.log('[Translate API] langCode:', langCode);

  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', { // FREE PLAN uchun
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

    console.log('[Translate API] DeepL status:', res.status);
    const raw = await res.text();
    console.log('[Translate API] DeepL raw response:', raw);

    if (!res.ok) {
      return NextResponse.json({ error: raw }, { status: 502 });
    }

    const data = JSON.parse(raw);
    const translated = data.translations?.[0]?.text || text;

    return NextResponse.json({ text: translated });
  } catch (err) {
    console.error('[Translate API] Exception:', err);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
