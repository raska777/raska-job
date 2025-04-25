// utils/jobTranslation.ts
import { translateText } from 'utils/translate';
import { LANG_CODES } from 'utils/langcodes';

interface Job {
  work_type: string;
  salary: string;
  language: string;
  [key: string]: any;
}

export async function getTranslatedJob(job: Job, lang: string): Promise<Job> {
  if (!job) return job;
  
  const langCode = LANG_CODES[lang] || 'EN';
  const fieldsToTranslate = ['work_type', 'salary', 'language'];

  // Create array of translation promises
  const translationPromises = fieldsToTranslate.map(field => 
    translateText(job[field], langCode)
  );

  try {
    // Execute all translations in parallel
    const [translatedWorkType, translatedSalary, translatedLanguage] = 
      await Promise.all(translationPromises);

    return {
      ...job,
      work_type: translatedWorkType,
      salary: translatedSalary,
      language: translatedLanguage,
    };
  } catch (error) {
    console.error('Job translation failed:', error);
    return job; // Return original job if translation fails
  }
}