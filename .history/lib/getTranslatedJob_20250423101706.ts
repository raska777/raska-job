import { translateText } from 'utils/translate';

interface Job {
  work_type: string;
  salary: string;
  language: string;
  [key: string]: any;
}

export async function getTranslatedJob(job: Job, lang: string): Promise<Job> {
  if (!job) return job;

  const fieldsToTranslate = ['work_type', 'salary', 'language'];

  try {
    const translationPromises = fieldsToTranslate.map((field) =>
      translateText(job[field], lang)
    );

    const [translatedWorkType, translatedSalary, translatedLanguage] = await Promise.all(
      translationPromises
    );

    return {
      ...job,
      work_type: translatedWorkType,
      salary: translatedSalary,
      language: translatedLanguage,
    };
  } catch (error) {
    console.error('Job translation failed:', error);
    return job;
  }
}
