// app/api/translate/route.ts
import { NextResponse } from 'next/server';
import { LANG_CODES } from '@/utils/langcodes';  // quyida yaratamiz

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();
  const authKey = process.env.DEEPL_API_KEY;
  if (!authKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const langCode = LANG_CODES[targetLang] || 'EN';
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `DeepL-Auth-Key ${authKey}`,
    },
    body: new URLSearchParams({ text, target_lang: langCode }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 502 });
  }

  const data = await res.json();
  const translated = data.translations?.[0]?.text ?? text;
  return NextResponse.json({ translated });
}
