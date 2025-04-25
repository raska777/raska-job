const axios = require('axios');

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api.deepl.com/v2/translate';

async function translateText(text, targetLang) {
  try {
    const response = await axios.post(
      DEEPL_API_URL,
      new URLSearchParams({
        text: text,
        target_lang: targetLang,
        auth_key: DEEPL_API_KEY
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    
    return response.data.translations[0].text;
  } catch (error) {
    console.error('DeepL API error:', error);
    return text; // Xato yuz bersa asl matnni qaytarish
  }
}

module.exports = { translateText };