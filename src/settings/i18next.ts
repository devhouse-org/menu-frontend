import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const getDefaultLanguage = () => {
  const storedLanguage = localStorage.getItem('language');
  document.body.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
  if (storedLanguage) return storedLanguage;
  else {
    localStorage.setItem('language', 'en');
    return 'en';
  }
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    // Default language
    lng: getDefaultLanguage(),
    // Fallback language
    fallbackLng: 'en',
    // Language detection
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    // Backend options for fetching translations
    // don't for get to return the variable to VITE_API_BASE_URL
    backend: {
      loadPath: `${import.meta.env.VITE_API_BASE_URL}/locales/{{lng}}.json`
    },
    // Enable debug mode
    debug: false,
    // React specific options
    react: {
      useSuspense: false
    },
    // Custom configurations for handling long keys
    keySeparator: false, // Disable key nesting by treating the key literally
    nsSeparator: false, // Disable namespace parsing in keys
    interpolation: {
      escapeValue: false // Disable escaping to handle special characters in keys
    },
    returnObjects: true // Allow returning objects or handling complex keys
  });

export default i18n;
