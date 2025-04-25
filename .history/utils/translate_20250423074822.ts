// utils/translate.ts
export async function translateText(text: string, targetLang: string): Promise<string> {
    if (!text.trim()) return text;
  
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
  
      if (!response.ok) {
        throw new Error(`Translation API responded with ${response.status}`);
      }
  
      const translatedText = await response.json();
      return translatedText || text;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text if translation fails
    }
  }