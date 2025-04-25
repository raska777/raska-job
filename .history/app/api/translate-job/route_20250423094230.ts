// import { NextResponse } from 'next/server';
// import { LANG_CODES } from 'utils/langcodes';

// export async function POST(req: Request) {
//   try {
//     const { text, targetLang } = await req.json();

//     const res = await fetch('https://api-free.deepl.com/v2/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
//       },
//       body: new URLSearchParams({
//         text,
//         target_lang: LANG_CODES[targetLang] || 'EN',
//       }),
//     });

//     const data = await res.json();
//     return NextResponse.json({ text: data?.translations?.[0]?.text || text });
//   } catch (error) {
//     return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { LANG_CODES } from 'utils/langcodes';

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();

    // Kerakli kodni aniqlaymiz
    const langCode = LANG_CODES[targetLang] || 'EN';

    const res = await fetch('https://api-free.deepl.com/v2/translate', { 
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
