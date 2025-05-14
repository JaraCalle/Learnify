import en from "./locales/en.json";
import es from "./locales/es.json";

const translations = { en, es };

export function getTranslations(locale) {
  return translations[locale] || translations.en;
}
