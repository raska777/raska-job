import { LANG_CODES } from "./langcodes";

// utils/translate.ts
export async function translateText(text: string, targetLang: string) {
    console.log("So'rov yuborilmoqda...", { text, targetLang });
  
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
      // ...
    } catch (error) {
      console.error("Xatolik:", error);
      return text;
    }
  }