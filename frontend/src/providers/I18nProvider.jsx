"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getInitialLocale, isValidLocale } from "@/lib/i18n/config";
import enTranslations from "@/lib/i18n/locales/en.json";
import esTranslations from "@/lib/i18n/locales/es.json";

const translations = {
  en: enTranslations,
  es: esTranslations,
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale());
  const [messages, setMessages] = useState(translations[locale]);

  useEffect(() => {
    setMessages(translations[locale]);
    // You might want to save the locale preference to localStorage here
    localStorage.setItem("preferredLocale", locale);
  }, [locale]);

  const t = (key) => {
    const keys = key.split(".");
    let value = messages;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  };

  const changeLocale = (newLocale) => {
    if (isValidLocale(newLocale)) {
      setLocale(newLocale);
    }
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
