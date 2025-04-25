// utils/translate.ts
export async function translateText(text: string, targetLang: string) {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang,
        }),
      });
  
      const data = await response.json();
      return data || text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  }