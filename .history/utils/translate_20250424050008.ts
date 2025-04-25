export async function translateText(text: string, targetLang: string): Promise<string> {
    if (!text.trim()) return text;
  
    try {
      const response = await fetch('/api/translate-job', {
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
        throw new Error(`Translation API error: ${response.status}`);
      }
  
      const { text: translated } = await response.json();
      return translated || text;
      
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  }
  