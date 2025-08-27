import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

export const useTranslation = () => {
  const { language } = useSettings();
  
  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || defaultValue || key;
  };

  return { t, language };
};

export default useTranslation;
