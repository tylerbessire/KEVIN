import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
  }, function(err, t) {
    if(err) {
      console.error('Error initializing i18next:', err);
    } else {
      console.log('i18next initialized successfully');
    }
  });

function translate(key) {
  return i18next.t(key);
}

window.translate = translate; // Expose the translate function for global access