import axios from 'axios';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api.deepl.com/v2/translate';

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await axios.post(DEEPL_API_URL, new URLSearchParams({
      text,
      target_lang: targetLang.toUpperCase(),
      auth_key: DEEPL_API_KEY
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error('DeepL API error:', error);
    return text; // Xatoda asl matnni qaytarish
  }
}