import axios from 'axios';

export async function POST(request: Request) {
  const { text, sourceLang, targetLang } = await request.json();

  try {
    const response = await axios.post('http://your-libretranslate-server/translate', {
      q: text,
      source: sourceLang,
      target: targetLang,
    });

    return Response.json({ translatedText: response.data.translatedText });
  } catch (error) {
    return Response.json({ error: 'Tarjima qilishda xato' }, { status: 500 });
  }
}
