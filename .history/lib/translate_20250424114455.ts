// lib/translate.ts
export async function translateText(text: string, targetLang: string): Promise<string> {
    if (!text.trim()) return text;
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      });
      const payload = await res.json();
      return payload.translated ?? text;
    } catch (e) {
      console.error('Translation error:', e);
      return text;
    }
  }
  