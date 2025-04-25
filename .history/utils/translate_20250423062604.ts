// utils/translate.ts
export async function translateText(text: string, targetLang: string) {
    // targetLang 'en', 'ko', 'th', 'vi', 'ru' bo'lishi kerak
    const langCode = LANG_CODES[targetLang] || 'EN'; // Agar til topilmasa, inglizcha
  
    try {
      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        },
        body: new URLSearchParams({
          text,
          target_lang: langCode,
        }),
      });
  
      if (!response.ok) throw new Error('Tarjima qilishda xatolik');
  
      const data = await response.json();
      return data?.translations?.[0]?.text || text;
    } catch (error) {
      console.error('Tarjima xatosi:', error);
      return text; // Xatolik yuz bersa, asl matn qaytariladi
    }
  }