'use client';
import { translateText } from '@/utils/translate';
import { LANG_CODES } from 'utils/langcodes';

export async function getTranslatedJob(job: any, lang: string) {
  const langCode = LANG_CODES[lang] || 'EN';

  return {
    ...job,
    title: await translateText(job.title, langCode),
    description: await translateText(job.description, langCode),
    location: await translateText(job.location, langCode),
  };
}
