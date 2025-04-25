export const fallbackLng = 'uz';

export const languages = ['uz', 'en', 'ru', 'ko'];

export const defaultNS = 'common';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
  };
}
