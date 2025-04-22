import axios from 'axios';

export async function POST(request: Request) {
  const { text, sourceLang, targetLang } = await request.json();

  try {
    const response = await axios.post('http://your-libretranslate-server/translate', {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    });

    return new Response(
      JSON.stringify({ translatedText: response.data.translatedText }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Tarjima xatosi:', error);
    return new Response(
      JSON.stringify({ error: 'Tarjima qilishda xato' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
