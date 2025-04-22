// // /app/components/TranslatedText.jsx

// 'use client';
// import { useState, useEffect } from 'react';

// export default function TranslatedText({ text, sourceLang, targetLang }) {
//   const [translatedText, setTranslatedText] = useState(text);

//   useEffect(() => {
//     const translateText = async () => {
//       try {
//         const res = await fetch('/api/translate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ text, sourceLang, targetLang }),
//         });
//         const data = await res.json();
//         setTranslatedText(data.translatedText);
//       } catch (error) {
//         console.error('Tarjima xatosi:', error);
//       }
//     };

//     if (sourceLang !== targetLang) translateText();
//   }, [text, sourceLang, targetLang]);

//   return <>{translatedText}</>;
// }


// components/AutoTranslatedText.tsx
'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AutoTranslatedTextProps {
  text: string;
  sourceLang?: string; // Agar berilmasa, current language dan foydalanadi
}

export default function AutoTranslatedText({ text, sourceLang }: AutoTranslatedTextProps) {
  const { language: targetLang } = useLanguage();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (!text.trim()) return;
      
      setIsTranslating(true);
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text, 
            sourceLang: sourceLang || targetLang, 
            targetLang 
          }),
        });
        
        if (res.ok) {
          const data = await res.json();
          setTranslatedText(data.translatedText);
        }
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    translateText();
  }, [text, sourceLang, targetLang]);

  return (
    <span>
      {isTranslating ? '...' : translatedText}
    </span>
  );
}