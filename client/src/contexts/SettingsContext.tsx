import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface SettingsContextType {
  // Theme settings
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Language settings
  language: string;
  setLanguage: (lang: string) => void;
  
  // Other settings
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  twoFactorAuth: boolean;
  setTwoFactorAuth: (value: boolean) => void;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
  publicProfile: boolean;
  setPublicProfile: (value: boolean) => void;
  
  // Functions
  saveSettings: () => void;
  loadSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  // Load settings from localStorage on mount
  const loadSettings = () => {
    try {
      // Load theme
      const savedTheme = localStorage.getItem('theme');
      const isDarkMode = savedTheme === 'dark' || 
                        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setDarkMode(isDarkMode);
      
      // Apply theme to document
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Load other settings
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setLanguage(settings.language || 'en');
        setNotifications(settings.notifications ?? true);
        setEmailNotifications(settings.emailNotifications ?? true);
        setTwoFactorAuth(settings.twoFactorAuth ?? false);
        setAutoSave(settings.autoSave ?? true);
        setPublicProfile(settings.publicProfile ?? false);
      }

      // Load language preference
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (['en', 'ar', 'es', 'fr'].includes(browserLang)) {
          setLanguage(browserLang);
        }
      }

      // Set document direction for RTL languages
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        darkMode,
        language,
        notifications,
        emailNotifications,
        twoFactorAuth,
        autoSave,
        publicProfile
      };
      
      localStorage.setItem('userSettings', JSON.stringify(settings));
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('language', language);
      
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Auto-save when settings change
  useEffect(() => {
    if (autoSave) {
      const timeoutId = setTimeout(() => {
        saveSettings();
      }, 1000); // Debounce auto-save by 1 second
      
      return () => clearTimeout(timeoutId);
    }
  }, [darkMode, language, notifications, emailNotifications, twoFactorAuth, publicProfile, autoSave]);

  // Apply language direction whenever language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value: SettingsContextType = {
    darkMode,
    toggleDarkMode,
    language,
    setLanguage: handleLanguageChange,
    notifications,
    setNotifications,
    emailNotifications,
    setEmailNotifications,
    twoFactorAuth,
    setTwoFactorAuth,
    autoSave,
    setAutoSave,
    publicProfile,
    setPublicProfile,
    saveSettings,
    loadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
