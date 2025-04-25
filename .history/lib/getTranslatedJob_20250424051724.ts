'use server';

import { isSupportedLang } from './langcodes';

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text?.trim() || !isSupportedLang(targetLang)) {
    return text;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/translate-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        targetLang,
      }),
      next: { revalidate: 3600 }, // 1 soat cache
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const { text: translated } = await response.json();
    return translated || text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; // fallback
  }
}

export async function translateObject<T extends Record<string, any>>(
  obj: T,
  fields: (keyof T)[],
  targetLang: string
): Promise<T> {
  if (!isSupportedLang(targetLang)) return obj;

  try {
    const translations = await Promise.all(
      fields.map((field) => translateText(String(obj[field]), targetLang))
    );

    const result = { ...obj };
    fields.forEach((field, index) => {
      result[field] = translations[index];
    });

    return result;
  } catch (error) {
    console.error('Object translation failed:', error);
    return obj;
  }
}