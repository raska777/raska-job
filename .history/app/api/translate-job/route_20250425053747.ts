// app/api/translate-job/route.ts
import { NextResponse } from 'next/server'
import { LANG_CODES } from '@/utils/langcodes'

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json()
    const langCode = LANG_CODES[targetLang] ?? 'EN'

    const deeplRes = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: new URLSearchParams({ text, target_lang: langCode }),
    })

    const raw = await deeplRes.text()
    if (!deeplRes.ok) {
      console.error('DeepL error:', raw)
      return NextResponse.json({ error: raw }, { status: 502 })
    }

    const data = JSON.parse(raw)
    const translated = data.translations?.[0]?.text ?? text
    return NextResponse.json({ text: translated })
  } catch (err) {
    console.error('Translation exception:', err)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
