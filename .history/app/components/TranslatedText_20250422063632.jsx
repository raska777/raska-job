'use client';
import { useState, useEffect } from 'react';

export default function TranslatedText({ text, sourceLang, targetLang }) {
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const translateText = async () => {
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, sourceLang, targetLang }),
        });
        const data = await res.json();
        setTranslatedText(data.translatedText);
      } catch (error) {
        console.error('Tarjima xatosi:', error);
      }
    };

    if (sourceLang !== targetLang) translateText();
  }, [text, sourceLang, targetLang]);

  return <>{translatedText}</>;
}