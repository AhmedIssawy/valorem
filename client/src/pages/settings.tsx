import { useNavigate } from "react-router-dom";
import { Moon, Sun, Bell, Shield, Globe, User, Save, ArrowLeft } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useTranslation } from "../hooks/useTranslation";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
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
    saveSettings
  } = useSettings();

  const handleSave = () => {
    saveSettings();
    alert(t('save_success'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex justify-between items-center pl-5 pr-6 py-5">
          <nav className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => navigate('/')}
              className="text-3xl font-black text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Valorem
            </button>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('home')}
              </a>
              <a href="/about" className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('about')}
              </a>
              <a href="/contact" className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('contact')}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Settings Content */}
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-3">
              {t('settings')}
            </h1>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-8">
              Customize your experience
            </p>

            <div className="space-y-8">
              {/* Appearance Settings */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Sun className="h-6 w-6 mr-3 text-yellow-500" />
                  {t('appearance')}
                </h2>
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {darkMode ? t('theme.dark') : t('theme.light')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('theme.description')}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Bell className="h-6 w-6 mr-3 text-green-500" />
                  {t('notifications')}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Push Notifications</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications</div>
                    </div>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Email Notifications</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Receive email updates</div>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-red-500" />
                  {t('security')}
                </h2>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</div>
                  </div>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* General Settings */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-purple-500" />
                  {t('general')}
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <label className="block font-semibold text-gray-800 dark:text-white mb-2">
                      {t('language')}
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">Auto Save</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Automatically save your work</div>
                    </div>
                    <button
                      onClick={() => setAutoSave(!autoSave)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoSave ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoSave ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="pb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-indigo-500" />
                  {t('privacy')}
                </h2>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Public Profile</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Make your profile visible to others</div>
                  </div>
                  <button
                    onClick={() => setPublicProfile(!publicProfile)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      publicProfile ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        publicProfile ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-colors duration-200"
              >
                <Save className="h-5 w-5" />
                <span>{t('save')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;