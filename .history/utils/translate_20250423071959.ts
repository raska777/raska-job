import { LANG_CODES } from './langcodes';

export async function translateText(text: string, targetLang: string) {
  console.log("Sending request...", { text, targetLang });

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

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("API Response:", data);

    return data?.translations?.[0]?.text || text;
  } catch (error) {
    console.error("Error:", error);
    return text;
  }
}