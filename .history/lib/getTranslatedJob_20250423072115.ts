import { translateText } from 'utils/translate';
import { LANG_CODES } from './langcodes';

interface Job {
  work_type: string;
  salary: string;
  language: string;
  [key: string]: any;
}

export async function getTranslatedJob(job: Job, lang: string): Promise<Job> {
  const langCode = LANG_CODES[lang] || 'EN';

  return {
    ...job,
    work_type: await translateText(job.work_type, langCode),
    salary: await translateText(job.salary, langCode),
    language: await translateText(job.language, langCode),
  };
}