// i18n.ts (3.x uchun)
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});