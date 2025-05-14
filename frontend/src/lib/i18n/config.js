export const defaultLocale = "en";
export const locales = ["en", "es"];

export function getInitialLocale() {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    // Get browser language
    const browserLang = window.navigator.language.split("-")[0];

    // If browser language is Spanish, use Spanish
    if (browserLang === "es") {
      return "es";
    }

    // For any other language, fallback to English
    return defaultLocale;
  }

  return defaultLocale;
}

export function isValidLocale(locale) {
  return locales.includes(locale);
}
