
import { createContext, useState, useEffect } from 'react';
import translations from './locale';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
      setLang(browserLang);
      localStorage.setItem('lang', browserLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.location.reload(); // أو استخدم تغيير ديناميكي بدون reload
  };

  const text = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, text, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
