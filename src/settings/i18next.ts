import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const getDefaultLanguage = () => {
  const storedLanguage = localStorage.getItem('language');
  document.body.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr'
  if(storedLanguage) return storedLanguage
  else {
    localStorage.setItem('language','en')
    return 'en'
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
    backend: {
      loadPath: `${import.meta.env.VITE_API_BASE_URL}/locales/{{lng}}.json`
    },
    // Enable debug mode
    debug: true,
    // React specific options
    react: {
      useSuspense: false
    }
  });

export default i18n;
