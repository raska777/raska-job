import { translateText } from '@/utils/translate';
import { LANG_CODES } from 'utils/langcodes';

export async function getTranslatedJob(job: any, lang: string) {
  const langCode = LANG_CODES[lang] || 'EN';

  return {
    ...job,
    work_type: await translateText(job.work_type, langCode),
    salary: await translateText(job.salary, langCode),
    language: await translateText(job.language, langCode),
  };
}
