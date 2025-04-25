import { NextResponse } from 'next/server';
import { LANG_CODES } from 'utils/langcodes';

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();

    const langCode = LANG_CODES[targetLang] || 'EN';  // Target language code

    const res = await fetch('https://api.deepl.com/v2/translate', {  // Correct API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({ text, target_lang: langCode }),
    });

    if (!res.ok) {
      console.error('DeepL javobi:', await res.text());
      return NextResponse.json({ error: 'DeepL so‘rovida xatolik' }, { status: 502 });
    }

    const data = await res.json();
    const translated = data?.translations?.[0]?.text || text;
    return NextResponse.json({ text: translated });
  } catch (err) {
    console.error('Tarjima API umumiy xato:', err);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
